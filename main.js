alert("レベル５モンスター「魔王」を倒してください");
let plyName = prompt("名前を入力してください");
let flag = true;
//Playerのデータ
let plyLv = 1;
let plyHp = 6;
let plyHpMax = 6;
let plyAtt = 1;
let plyHeal = 1;
let plyExp = 0;
let plyExpNext = 5;
let plyExpNeed = new Array(9);
plyExpNeed = [5, 15, 30, 50, 60, 75, 90, 120, 150];
//Playerレベルステータス
let LplyHp = new Array(11);
LplyHp = [0, 6, 10, 15, 21, 27, 30, 35, 51, 75, 110];
let LplyAtt = new Array(11);
LplyAtt = [0, 1, 2, 3, 4, 5, 7, 9, 13, 18, 25];
let LplyHeal = new Array(11);
LplyHeal = [0, 1, 3, 4, 6, 7, 10, 12, 15, 20, 30];
//Player配列データ(IDの取得）必須1
let plySt = new Array(8);
for (let i = 0; i < 8; i++) {
  plySt[i] = document.getElementById("plySt" + i);
}
//名前決定
plySt[0].textContent = plyName;
//Playerの回復モーション
plySt[7].addEventListener("mousedown", () => {
  if (flag) {
    plySt[7].src = "img/playerC.png";
  }
});
plySt[7].addEventListener("mouseup", () => {
  if (flag) {
    plySt[7].src = "img/playerA.png";
    plyHp += plyHeal;
    if (plyHp > plyHpMax) {
      plyHp = plyHpMax;
    }
    plySt[2].textContent = "HP:" + plyHp;
  }
});
//Monstarのデータ(配列)必須3
let monPc = new Array(5);
monPc = ["大鼠", "スライム", "ただの蜘蛛", "ケルベロス", "魔王"];
let monLv = new Array(5);
monLv = ["1", "2", "3", "4", "5"];
let monHP = new Array(5);
monHP = ["5", "10", "20", "40", "500"];
let monAtt = new Array(5);
monAtt = ["1", "2", "10", "30", "50"];
let monExp = new Array(5);
monExp = ["1", "2", "3", "5", "100"];
//Enemy配列データ(ID取得)必須２
let eneSt = new Array(8);
for (let i = 0; i < 8; i++) {
  eneSt[i] = document.getElementById("eneSt" + i);
}
//Enemyのデータ
let eneLv = 2;
let eneHp = 10;
let eneHpMax0 = 10;
let eneAtt0 = 2;
let eneKill0 = 0;
let eneExp0 = 2;
let eneCnt = 5;
let eneCntMax0 = 5;

//Monstar変更操作必須４、５
let m = 1;
nige = document.getElementById("left");
nige.addEventListener("click", () => {
  if (flag) {
    console.log("逃げる");
    m--;
    if (m == -1) {
      alert("これ以上逃げることはできない");
      m++;
    }
    eneLv = monLv[m];
    eneHp = monHP[m] * 1;
    eneHpMax0 = monHP[m];
    eneAtt0 = monAtt[m];
    eneExp0 = monExp[m] * 1;
    eneSt[0].textContent = monPc[m];
    eneSt[1].textContent = "レベル:" + eneLv;
    eneSt[2].textContent = "HP:" + eneHp;
    eneSt[3].textContent = "攻撃力:" + eneAtt0;
    eneSt[7].src = "img/enemyA" + m + ".png";
  }
});
susumu = document.getElementById("right");
susumu.addEventListener("click", () => {
  if (flag) {
    console.log("進む");
    m++;
    if (m == 5) {
      alert("この敵がもっともの強い敵のようだ");
      m--;
    }
    eneLv = monLv[m];
    eneHp = monHP[m];
    eneHpMax0 = monHP[m];
    eneAtt0 = monAtt[m];
    eneExp0 = monExp[m] * 1;
    eneSt[0].textContent = monPc[m];
    eneSt[1].textContent = "レベル:" + eneLv;
    eneSt[2].textContent = "HP:" + eneHp;
    eneSt[3].textContent = "攻撃力:" + eneAtt0;
    eneSt[7].src = "img/enemyA" + m + ".png";
  }
});
//Enemyを攻撃
eneSt[7].addEventListener("mousedown", () => {
  if (flag) {
    eneSt[7].src = "img/enemyB" + m + ".png";
  }
});
eneSt[7].addEventListener("mouseup", () => {
  if (flag) {
    eneSt[7].src = "img/enemyA" + m + ".png";
    if (eneHp > 0) {
      eneHp -= plyAtt;
    } else {
      eneHp = eneHpMax0;
      eneKill0++;
      //ゲームクリア処理
      if (m == 4) {
        console.log("魔王");
        flag = false;
      }
      eneSt[4].textContent = "倒した回数:" + eneKill0;
      //経験値処理
      plyExp += eneExp0;
      plySt[5].textContent = "経験値:" + plyExp;
      plyExpNext -= eneExp0;
      //LvUp処理
      if (plyExpNext <= 0) {
        plyExpNext = plyExpNeed[plyLv];
        plyLv++;
        plySt[1].textContent = "レベル:" + plyLv;
        plyHpMax = LplyHp[plyLv];
        plyHp = plyHpMax;
        plySt[2].textContent = "HP:" + plyHp;
        plyAtt = LplyAtt[plyLv];
        plySt[3].textContent = "攻撃力:" + plyAtt;
        plyHeal = LplyHeal[plyLv];
        plySt[4].textContent = "回復魔法:" + plyHeal;
      }
      plySt[6].textContent = "次のレベルまでの経験値" + plyExpNext + "ポイント";
    }
    eneSt[2].textContent = "HP:" + eneHp;
  }
});

//Enemyの攻撃(時間ごと)
let eneSec = document.getElementById("eneSec");
let loop = setInterval(() => {
  if (flag) {
    if (eneCnt > 0) {
      eneCnt--;
      eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
    } else {
      plySt[7].src = "img/playerB.png";
      plyHp -= eneAtt0;
      if (plyHp > 0) {
        plySt[2].textContent = "Hp:" + plyHp;
        eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
      } else {
        plyHp = 0;
        clearInterval(loop);
        flag = false;
        plySt[2].textContent = "Hp:" + plyHp;
        eneSec.textContent = "ゲームオーバー";
      }
      setTimeout(() => {
        if (flag) {
          eneCnt = eneCntMax0;
          plySt[7].src = "img/playerA.png";
          eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
        }
      }, 500);
    }
  } else {
    clearInterval(loop);
    eneSt[7].src = "img/clear.png";
  }
}, 1000);
