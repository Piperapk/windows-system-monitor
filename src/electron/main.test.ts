import { expect, Mock, test, vi } from "vitest";
import { setupTray } from "./main.js";
import { app, BrowserWindow, Menu } from "electron";

vi.mock("electron", () => {
  return {
    Tray: vi.fn().mockReturnValue({
      setContextMenu: vi.fn(),
      setToolTip: vi.fn(),
      on: vi.fn(),
    }),
    app: {
      getAppPath: vi.fn().mockReturnValue("/"),
      dock: {
        show: vi.fn(),
      },
      quit: vi.fn(),
      on: vi.fn(),
    },
    Menu: {
      buildFromTemplate: vi.fn(),
      setApplicationMenu: vi.fn(),
    },
  };
});

const mainWindow = {
  show: vi.fn(),
} satisfies Partial<BrowserWindow> as unknown as BrowserWindow;

test("is tray menu working", () => {
  setupTray(mainWindow);

  const calls = (Menu.buildFromTemplate as unknown as Mock).mock.calls;
  const args = calls[0] as Parameters<typeof Menu.buildFromTemplate>;
  const template = args[0];
  expect(template).toHaveLength(3);

  expect(template[0].label).toEqual("Show");
  template[0]?.click?.(
    null as unknown as Electron.MenuItem,
    null as unknown as BrowserWindow,
    null as unknown as Electron.KeyboardEvent
  );
  expect(mainWindow.show).toHaveBeenCalled();

  expect(template[1].type).toEqual("separator");

  template[2]?.click?.(
    null as unknown as Electron.MenuItem,
    null as unknown as BrowserWindow,
    null as unknown as Electron.KeyboardEvent
  );
  expect(app.quit).toHaveBeenCalled();
});
