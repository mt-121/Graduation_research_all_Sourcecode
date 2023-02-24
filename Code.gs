//タブのタイトル設定
function doGet() {
  const htmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
  htmlOutput.setTitle('質問ツール');
  return htmlOutput;
}


function getsheetData(){
  //Activeなシートを取得し、sheetDBに代入する。
  const sheetDB = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  //Activeなシートの内、A2:L1000の範囲でデータを取得後、配列に格納し、変数listに代入する。
  let   list    = sheetDB.getRange("A2:L1000").getValues();
  
  //listの中に代入された、取得データをJSONで返す
  return JSON.stringify(list);
}

//以下、メール送信用
function sendMail() {
  //メッセージボックスで選択肢を出す
  var result = Browser.inputBox("WEBページ リンク共有", "メールアドレスを入力してください。\\n下記のメールアドレスにWEBページのリンクを送信します。", Browser.Buttons.OK_CANCEL);
  Logger.log(MailApp.getRemainingDailyQuota());
  const recipient = result;
  const from_address = "xxxxx@xxx.xx.xx";
  const recipientCompany = result + '様';
  const recipientName = 'GAS送信';
  const subject = '【GASメール送信】';
  const webapplink = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
 
  const body = recipientCompany + '\n' + recipientName + '\n\n'
  + 'これは、GASでの質問ツールのリンク共有メールです。\n\n\n'
  + '以下にWEBアプリのリンクを記載します。\n'
  + 'ご確認をお願いします\n\n'
  + webapplink + '\n\n\n';
 
  const options = {
     from: from_address ,
     name: 'GASテスト用'
  };  
 
  GmailApp.sendEmail(recipient, subject, body, options);

  if (result != "cancel"){
    Browser.msgBox(result + "さん" + '\\n' + "メールを送信しました！");
  }
}


//スプレッドシート上の選択タブの追加
function onOpen() {
  const customMenu = SpreadsheetApp.getUi()
  customMenu.createMenu('リンク共有')　//メニューバーに表示するカスタムメニュー名
      .addItem('WEBページリンク共有', 'sendMail')　//メニューアイテムを追加
      .addToUi()
}
