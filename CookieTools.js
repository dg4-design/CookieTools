// 初期化のためオブジェクトを先に定義
var CookieTools = {};

//===========================================================================
// CookieTools.js
// Cookieクリッカー自動化ツール
// 使用方法: CookieTools.startAll() で全機能開始、CookieTools.stopAll() で全機能停止
//===========================================================================

(function (CookieTools) {
  // 設定
  CookieTools.isFortuneRunning = false;
  CookieTools.isGoldenRunning = false;
  CookieTools.isBigCookieRunning = false;
  CookieTools.fortuneInterval = 1000; // 1秒ごとにチェック
  CookieTools.goldenInterval = 500; // 0.5秒ごとにチェック
  CookieTools.bigCookieInterval = 0; // できるだけ速く
  CookieTools.bigCookieIntervalOptions = [
    { value: 0, label: "超高速" },
    { value: 10, label: "高速" },
    { value: 100, label: "通常" },
  ];
  CookieTools.currentBigCookieIntervalIndex = 0; // デフォルトは超高速
  CookieTools.fortuneTimerId = null;
  CookieTools.goldenTimerId = null;
  CookieTools.bigCookieTimerId = null;

  // フォーチュンアップグレード自動クリック
  CookieTools.fortuneCheck = function () {
    if (!CookieTools.isFortuneRunning) return;
    if (!Game || Game.OnAscend || Game.AscendTimer > 0) return;

    if (Game.TickerEffect && Game.TickerEffect.type === "fortune" && Game.TickerEffect.sub !== "fortuneGC" && Game.TickerEffect.sub !== "fortuneCPS") {
      if (l("commentsText1")) l("commentsText1").click();
    }
  };

  // 黄金クッキー自動クリック
  CookieTools.goldenCheck = function () {
    if (!CookieTools.isGoldenRunning) return;
    if (!Game || Game.OnAscend || Game.AscendTimer > 0) return;

    for (var i in Game.shimmers) {
      Game.shimmers[i].pop();
    }
  };

  // 大クッキー自動クリック
  CookieTools.bigCookieCheck = function () {
    if (!CookieTools.isBigCookieRunning) return;
    if (!Game || Game.OnAscend || Game.AscendTimer > 0) return;

    Game.ClickCookie();
  };

  // フォーチュン自動クリック開始
  CookieTools.startFortune = function () {
    if (CookieTools.isFortuneRunning) return;

    CookieTools.isFortuneRunning = true;
    CookieTools.fortuneTimerId = setInterval(CookieTools.fortuneCheck, CookieTools.fortuneInterval);

    Game.Notify("フォーチュン自動クリック", "ニュースのフォーチュンを自動的にクリックします", [16, 5], 1);
    setTimeout(CookieTools.fortuneCheck, 100);

    // UI更新
    const button = l("CookieToolsFortuneEnabled");
    if (button) {
      button.textContent = "ON";
      button.className = "option";
    }
  };

  // フォーチュン自動クリック停止
  CookieTools.stopFortune = function () {
    if (!CookieTools.isFortuneRunning) return;

    CookieTools.isFortuneRunning = false;
    if (CookieTools.fortuneTimerId) {
      clearInterval(CookieTools.fortuneTimerId);
      CookieTools.fortuneTimerId = null;
    }

    Game.Notify("フォーチュン自動クリック", "自動クリックを停止しました", [17, 5], 1);

    // UI更新
    const button = l("CookieToolsFortuneEnabled");
    if (button) {
      button.textContent = "OFF";
      button.className = "option off";
    }
  };

  // 黄金クッキー自動クリック開始
  CookieTools.startGolden = function () {
    if (CookieTools.isGoldenRunning) return;

    CookieTools.isGoldenRunning = true;
    CookieTools.goldenTimerId = setInterval(CookieTools.goldenCheck, CookieTools.goldenInterval);

    Game.Notify("黄金クッキー自動クリック", "黄金クッキーを自動的にクリックします", [16, 5], 1);
    setTimeout(CookieTools.goldenCheck, 100);

    // UI更新
    const button = l("CookieToolsGoldenEnabled");
    if (button) {
      button.textContent = "ON";
      button.className = "option";
    }
  };

  // 黄金クッキー自動クリック停止
  CookieTools.stopGolden = function () {
    if (!CookieTools.isGoldenRunning) return;

    CookieTools.isGoldenRunning = false;
    if (CookieTools.goldenTimerId) {
      clearInterval(CookieTools.goldenTimerId);
      CookieTools.goldenTimerId = null;
    }

    Game.Notify("黄金クッキー自動クリック", "自動クリックを停止しました", [17, 5], 1);

    // UI更新
    const button = l("CookieToolsGoldenEnabled");
    if (button) {
      button.textContent = "OFF";
      button.className = "option off";
    }
  };

  // 大クッキー自動クリック開始
  CookieTools.startBigCookie = function () {
    if (CookieTools.isBigCookieRunning) return;

    CookieTools.isBigCookieRunning = true;
    CookieTools.bigCookieTimerId = setInterval(CookieTools.bigCookieCheck, CookieTools.bigCookieInterval);

    Game.Notify("大クッキー自動クリック", "大クッキーを自動的にクリックします", [16, 5], 1);
    setTimeout(CookieTools.bigCookieCheck, 100);

    // UI更新
    const button = l("CookieToolsBigCookieEnabled");
    if (button) {
      button.textContent = "ON";
      button.className = "option";
    }
  };

  // 大クッキー自動クリック停止
  CookieTools.stopBigCookie = function () {
    if (!CookieTools.isBigCookieRunning) return;

    CookieTools.isBigCookieRunning = false;
    if (CookieTools.bigCookieTimerId) {
      clearInterval(CookieTools.bigCookieTimerId);
      CookieTools.bigCookieTimerId = null;
    }

    Game.Notify("大クッキー自動クリック", "自動クリックを停止しました", [17, 5], 1);

    // UI更新
    const button = l("CookieToolsBigCookieEnabled");
    if (button) {
      button.textContent = "OFF";
      button.className = "option off";
    }
  };

  // 大クッキー自動クリック間隔を設定
  CookieTools.setBigCookieInterval = function (intervalIndex) {
    // インデックスの範囲をチェック
    if (intervalIndex < 0 || intervalIndex >= CookieTools.bigCookieIntervalOptions.length) {
      return false;
    }

    // 新しい間隔を設定
    CookieTools.currentBigCookieIntervalIndex = intervalIndex;
    CookieTools.bigCookieInterval = CookieTools.bigCookieIntervalOptions[intervalIndex].value;

    // 実行中なら再スタート
    if (CookieTools.isBigCookieRunning && CookieTools.bigCookieTimerId) {
      clearInterval(CookieTools.bigCookieTimerId);
      CookieTools.bigCookieTimerId = setInterval(CookieTools.bigCookieCheck, CookieTools.bigCookieInterval);

      // 通知
      Game.Notify("大クッキー自動クリック", "クリック間隔を " + CookieTools.bigCookieIntervalOptions[intervalIndex].label + " に変更しました", [16, 5], 1);
    }

    // UI更新
    const intervalButton = l("CookieToolsBigCookieInterval");
    if (intervalButton) {
      intervalButton.textContent = CookieTools.bigCookieIntervalOptions[intervalIndex].label;
    }

    return true;
  };

  // 大クッキー自動クリック間隔を次のオプションに切り替え
  CookieTools.cycleBigCookieInterval = function () {
    const nextIndex = (CookieTools.currentBigCookieIntervalIndex + 1) % CookieTools.bigCookieIntervalOptions.length;
    return CookieTools.setBigCookieInterval(nextIndex);
  };

  // すべての機能を開始
  CookieTools.startAll = function () {
    CookieTools.startFortune();
    CookieTools.startGolden();
    CookieTools.startBigCookie();
  };

  // すべての機能を停止
  CookieTools.stopAll = function () {
    CookieTools.stopFortune();
    CookieTools.stopGolden();
    CookieTools.stopBigCookie();
  };

  // 各機能の切り替え
  CookieTools.toggleFortune = function () {
    CookieTools.isFortuneRunning ? CookieTools.stopFortune() : CookieTools.startFortune();
  };

  CookieTools.toggleGolden = function () {
    CookieTools.isGoldenRunning ? CookieTools.stopGolden() : CookieTools.startGolden();
  };

  CookieTools.toggleBigCookie = function () {
    CookieTools.isBigCookieRunning ? CookieTools.stopBigCookie() : CookieTools.startBigCookie();
  };

  // CookieClickerのゲーム設定に直接追加
  CookieTools.injectIntoOptions = function () {
    // 既に追加済みかチェック
    if (Game.customOptionsMenu && Game.customOptionsMenu.indexOf("CookieTools.addOptionsMenu") !== -1) {
      return;
    }

    // 現在のオプションメニュー関数をバックアップ
    if (!Game.customOptionsMenu) {
      Game.customOptionsMenu = [];
      CookieTools.originalUpdateMenu = Game.UpdateMenu;

      // Game.UpdateMenu関数をオーバーライド
      Game.UpdateMenu = function () {
        // 元のメニュー更新関数を実行
        CookieTools.originalUpdateMenu();

        // 現在のメニューがオプションメニューであれば、カスタムオプションを追加
        if (Game.onMenu === "prefs") {
          // すべてのカスタムオプションメニュー処理を実行
          Game.customOptionsMenu.forEach(function (customMenuCallback) {
            if (typeof window[customMenuCallback] === "function") {
              try {
                window[customMenuCallback]();
              } catch (e) {}
            }
          });
        }
      };
    }

    // カスタムメニューに登録
    if (Game.customOptionsMenu.indexOf("CookieTools.addOptionsMenu") === -1) {
      Game.customOptionsMenu.push("CookieTools.addOptionsMenu");
    }

    // 現在のメニュー状態をチェック
    if (Game.onMenu === "prefs") {
      CookieTools.addOptionsMenu();
    }
  };

  // オプションメニューに設定項目を追加
  CookieTools.addOptionsMenu = function () {
    const optionsMenu = l("menu");

    if (!optionsMenu) {
      return;
    }

    // CookieClickerの設定セクションを特定
    let subMenu = null;

    // 既存のセクションを探す
    if (l("preferenceTableBodies")) {
      subMenu = l("preferenceTableBodies");
    } else {
      const sections = optionsMenu.querySelectorAll(".section");
      if (sections && sections.length > 0) {
        subMenu = sections[0];
      }
    }

    if (!subMenu) {
      subMenu = optionsMenu;
    }

    // 既に追加済みセクションがあれば削除
    const existingSection = l("CookieToolsOptions");
    if (existingSection) {
      existingSection.remove();
    }

    // 新しいセクションを作成
    const newSection = document.createElement("div");
    newSection.id = "CookieToolsOptions";
    newSection.className = "subsection";
    newSection.style.padding = "0px";
    newSection.style.margin = "8px 4px";

    // セクションのタイトル
    const sectionTitle = document.createElement("div");
    sectionTitle.className = "title";
    sectionTitle.textContent = "Cookie自動化ツール";
    newSection.appendChild(sectionTitle);

    // オプションテーブル
    const optionsTable = document.createElement("div");
    optionsTable.className = "listing";

    // フォーチュン自動クリックの設定
    const fortuneRow = CookieTools.createPreferenceRow(
      "フォーチュン自動クリック",
      "CookieToolsFortuneEnabled",
      CookieTools.isFortuneRunning ? "ON" : "OFF",
      "ニュースに表示されるフォーチュンを自動的にクリックします"
    );

    fortuneRow.querySelector("a.option").onclick = function () {
      CookieTools.toggleFortune();
      this.textContent = CookieTools.isFortuneRunning ? "ON" : "OFF";
      this.className = "option" + (CookieTools.isFortuneRunning ? "" : " off");
      return false;
    };
    optionsTable.appendChild(fortuneRow);

    // 黄金クッキー自動クリックの設定
    const goldenRow = CookieTools.createPreferenceRow("黄金クッキー自動クリック", "CookieToolsGoldenEnabled", CookieTools.isGoldenRunning ? "ON" : "OFF", "黄金クッキーを自動的にクリックします");

    goldenRow.querySelector("a.option").onclick = function () {
      CookieTools.toggleGolden();
      this.textContent = CookieTools.isGoldenRunning ? "ON" : "OFF";
      this.className = "option" + (CookieTools.isGoldenRunning ? "" : " off");
      return false;
    };
    optionsTable.appendChild(goldenRow);

    // 大クッキー自動クリックの設定
    const bigCookieRow = CookieTools.createPreferenceRow("大クッキー自動クリック", "CookieToolsBigCookieEnabled", CookieTools.isBigCookieRunning ? "ON" : "OFF", "大クッキーを自動的にクリックします");

    bigCookieRow.querySelector("a.option").onclick = function () {
      CookieTools.toggleBigCookie();
      this.textContent = CookieTools.isBigCookieRunning ? "ON" : "OFF";
      this.className = "option" + (CookieTools.isBigCookieRunning ? "" : " off");
      return false;
    };
    optionsTable.appendChild(bigCookieRow);

    // 大クッキー自動クリック間隔の設定
    const bigCookieIntervalRow = CookieTools.createPreferenceRow(
      "大クッキークリック間隔",
      "CookieToolsBigCookieInterval",
      CookieTools.bigCookieIntervalOptions[CookieTools.currentBigCookieIntervalIndex].label,
      "大クッキーをクリックする間隔を設定します（低い値=高速, 高い値=低負荷）"
    );

    bigCookieIntervalRow.querySelector("a.option").onclick = function () {
      CookieTools.cycleBigCookieInterval();
      this.textContent = CookieTools.bigCookieIntervalOptions[CookieTools.currentBigCookieIntervalIndex].label;
      return false;
    };
    optionsTable.appendChild(bigCookieIntervalRow);

    newSection.appendChild(optionsTable);

    // オプションメニューに追加
    subMenu.appendChild(newSection);
  };

  // 設定行を作成するヘルパー関数
  CookieTools.createPreferenceRow = function (name, id, value, description) {
    const row = document.createElement("div");
    row.className = "listing";

    // オプション名
    const nameSpan = document.createElement("span");
    nameSpan.className = "name";
    nameSpan.textContent = name;
    row.appendChild(nameSpan);

    // オプション値
    const valueLink = document.createElement("a");
    valueLink.id = id;
    valueLink.className = "option" + (value === "OFF" ? " off" : "");
    valueLink.textContent = value;
    row.appendChild(valueLink);

    // 説明
    if (description) {
      const descDiv = document.createElement("div");
      descDiv.className = "description";
      descDiv.textContent = description;
      row.appendChild(descDiv);
    }

    return row;
  };

  // 初期化処理
  CookieTools.init = function () {
    // CookieClickerが存在するか確認
    if (typeof Game === "undefined") {
      return;
    }

    // l関数が存在するか確認
    if (typeof l !== "function") {
      window.l = function (id) {
        return document.getElementById(id);
      };
    }

    // Game.customOptionsMenuを初期化
    if (!Game.customOptionsMenu) {
      Game.customOptionsMenu = [];
      CookieTools.originalUpdateMenu = Game.UpdateMenu;

      // Game.UpdateMenu関数をオーバーライド
      Game.UpdateMenu = function () {
        // 元のメニュー更新関数を実行
        CookieTools.originalUpdateMenu();

        // 現在のメニューがオプションメニューであれば、カスタムオプションを追加
        if (Game.onMenu === "prefs") {
          // すべてのカスタムオプションメニュー処理を実行
          Game.customOptionsMenu.forEach(function (customMenuCallback) {
            // 文字列からオブジェクトと関数を取得
            const parts = customMenuCallback.split(".");
            let obj = window;
            let funcName = customMenuCallback;

            if (parts.length > 1) {
              obj = window[parts[0]];
              funcName = parts[1];
            }

            if (obj && typeof obj[funcName] === "function") {
              try {
                obj[funcName]();
              } catch (e) {}
            }
          });
        }
      };
    }

    // カスタムメニューに登録
    const callbackName = "CookieTools.addOptionsMenu";
    if (Game.customOptionsMenu.indexOf(callbackName) === -1) {
      Game.customOptionsMenu.push(callbackName);
    }

    // 現在のメニュー状態をチェック
    if (Game.onMenu === "prefs") {
      CookieTools.addOptionsMenu();
    } else {
      try {
        // ゲームのOption APIが利用可能ならそれを使う
        if (typeof Game.ShowMenu === "function") {
          Game.ShowMenu("prefs");
        }
      } catch (e) {}
    }

    // グローバルWindowオブジェクトに関数を追加
    if (typeof window.CookieTools === "undefined") {
      window.CookieTools = CookieTools;
    }
  };

  // 初期化を実行
  setTimeout(CookieTools.init, 1000);

  // モッドAPIのフック追加
  if (typeof Game !== "undefined") {
    Game.registerMod("CookieTools", {
      init: function () {
        CookieTools.init();

        // メニュー更新が確実に行われるように、Game.ShowMenuをオーバーライド
        if (!CookieTools.originalShowMenu && Game.ShowMenu) {
          CookieTools.originalShowMenu = Game.ShowMenu;

          Game.ShowMenu = function (what) {
            // 元の関数を呼び出す
            CookieTools.originalShowMenu(what);

            // オプションメニューが開かれた場合、設定を表示
            if (what === "prefs") {
              // 一定の遅延を設けてメニュー要素が確実に存在するようにする
              setTimeout(function () {
                if (typeof CookieTools.addOptionsMenu === "function") {
                  CookieTools.addOptionsMenu();
                }
              }, 100);
            }
          };
        }

        return true;
      },
    });
  }
})(CookieTools);
