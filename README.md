# Cookie Tools 🍪 👆

Cookie Clicker 用の自動化ツールです。ニュースのフォーチュン、黄金クッキー、大クッキーを自動的にクリックします。

## 機能

### フォーチュン自動クリック

- ニュースティッカーに表示されるフォーチュンを自動的にクリック
- ゲーム内オプション画面から ON/OFF 設定可能

### 黄金クッキー自動クリック

- 画面に表示される黄金クッキーを自動的にクリック
- ゲーム内オプション画面から ON/OFF 設定可能

### 大クッキー自動クリック

- 画面中央の大きなクッキーを自動的にクリック
- ゲーム内オプション画面から ON/OFF 設定可能

## 前提条件

- [Cookie Clicker](https://orteil.dashnet.org/cookieclicker/)

## インストール方法

### 方法

1. ブラウザの開発者ツールを開く
2. 「コンソール」タブを開く
3. 以下のコードをコピーしてコンソールに貼り付け、Enter キーを押す

```javascript
Game.LoadMod("https://dg4-design.github.io/CookieTools/CookieTools.js");
```

## 使い方

### 設定メニュー

ゲーム内設定メニュー（Options）から以下を設定：

- **フォーチュン自動クリック**: ニュースのフォーチュンを自動的にクリックする機能の ON/OFF
- **黄金クッキー自動クリック**: 黄金クッキーを自動的にクリックする機能の ON/OFF
- **大クッキー自動クリック**: 大クッキーを自動的にクリックする機能の ON/OFF

### コマンド

コンソールから以下のコマンドで直接制御することも可能です：

#### すべての機能

- すべての機能を開始: `CookieTools.startAll()`
- すべての機能を停止: `CookieTools.stopAll()`

#### フォーチュン自動クリック

- 開始: `CookieTools.startFortune()`
- 停止: `CookieTools.stopFortune()`
- 切替: `CookieTools.toggleFortune()`

#### 黄金クッキー自動クリック

- 開始: `CookieTools.startGolden()`
- 停止: `CookieTools.stopGolden()`
- 切替: `CookieTools.toggleGolden()`

#### 大クッキー自動クリック

- 開始: `CookieTools.startBigCookie()`
- 停止: `CookieTools.stopBigCookie()`
- 切替: `CookieTools.toggleBigCookie()`

## 仕組み

このスクリプトは定期的に画面をチェックし、以下の要素が表示されたときに自動的にクリックします：

- ニュースティッカーのフォーチュン：1 秒ごとにチェック
- 黄金クッキー：0.5 秒ごとにチェック
- 大クッキー：できるだけ速くクリック

すべての設定はゲーム内のオプションメニューから簡単に変更できます。
