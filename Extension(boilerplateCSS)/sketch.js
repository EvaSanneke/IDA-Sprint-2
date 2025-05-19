console.log("!! sketch.js");

// P5 Instanz-Modus verwenden
let p5Instance = new p5((p) => {
  // Textgruppen - jede mit eigener Position, Geschwindigkeit und Farbe
  let texts = [
    {
      text: "TAKE",
      x: 0,
      y: 0,
      xspeed: 2,
      yspeed: 1.5,
      r: 255,
      g: 0,
      b: 0,
      dirX: 1,
      dirY: 1,
    },
    {
      text: "A",
      x: 0,
      y: 0,
      xspeed: 2.5,
      yspeed: 2,
      r: 0,
      g: 255,
      b: 0,
      dirX: 1,
      dirY: 1,
    },
    {
      text: "BREAK!",
      x: 0,
      y: 0,
      xspeed: 1.5,
      yspeed: 2.5,
      r: 0,
      g: 0,
      b: 255,
      dirX: 1,
      dirY: 1,
    },
  ];

  // Container für den Canvas
  let container;

  // Timer-Variablen
  let startTime;
  let timerDuration = 60; // 60 Sekunden = 1 Minute
  let animationActive = false;
  let countdownText = "";

  p.setup = function () {
    console.log("!! sketch.js setup");

    // Container erstellen und anhängen
    container = document.createElement("div");
    container.id = "p5-container";
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.zIndex = "9999";
    container.style.pointerEvents = "none"; // Erlaubt Klicks durch den Container
    document.body.appendChild(container);

    let canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent(container);

    p.textSize(48);
    p.textAlign(p.LEFT, p.TOP);

    // Setze zufällige Startpositionen für alle Texte
    texts.forEach((t) => {
      t.x = p.random(p.width);
      t.y = p.random(p.height);
      // Leicht unterschiedliche Startgeschwindigkeiten
      t.xspeed *= p.random(0.8, 1.2);
      t.yspeed *= p.random(0.8, 1.2);
    });

    // Timer starten
    startTime = p.millis();
  };

  p.draw = function () {
    p.clear(); // Den Canvas leeren für Transparenz

    // Timer-Logik
    let elapsedSeconds = (p.millis() - startTime) / 1000;
    let remainingSeconds = Math.max(0, timerDuration - elapsedSeconds);

    if (remainingSeconds > 0) {
      // Timer läuft noch - zeige Countdown in der Mitte des Bildschirms
      countdownText =
        "Take a break in " + Math.ceil(remainingSeconds) + " seconds";
      p.fill(0);
      p.noStroke();
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(24);
      p.text(countdownText, p.width / 2, 50);
      p.textAlign(p.LEFT, p.TOP); // Text-Alignment zurücksetzen
      p.textSize(48); // Textgröße zurücksetzen
    } else if (!animationActive) {
      // Timer ist abgelaufen, aktiviere Animation
      animationActive = true;
      console.log("Animation aktiviert nach Timer-Ablauf");
    }

    // Animation nur ausführen, wenn der Timer abgelaufen ist
    if (animationActive) {
      // Zeichne und aktualisiere jeden Text
      texts.forEach((t) => {
        // Zeichne Text mit eigener Farbe
        p.fill(t.r, t.g, t.b);
        p.stroke(0);
        p.strokeWeight(1);
        p.text(t.text, t.x, t.y);

        // Aktualisiere Position
        t.x += t.xspeed;
        t.y += t.yspeed;

        // Kollisionsberechnungen
        let tw = p.textWidth(t.text);
        let th = p.textAscent() + p.textDescent();

        // Randkollision prüfen und Farbe ändern
        if (t.x + tw >= p.width && t.dirX == 1) {
          t.xspeed = -t.xspeed;
          changeColor(t);
          t.dirX = 0;
        }
        if (t.x < 0 && t.dirX == 0) {
          t.xspeed = -t.xspeed;
          changeColor(t);
          t.dirX = 1;
        }

        if (t.y + th >= p.height && t.dirY == 1) {
          t.yspeed = -t.yspeed;
          changeColor(t);
          t.dirY = 0;
        }
        if (t.y < 0 && t.dirY == 0) {
          t.yspeed = -t.yspeed;
          changeColor(t);
          t.dirY = 1;
        }
      });
    }
  };

  // Funktion zum Farbwechsel für einen einzelnen Text
  function changeColor(textObj) {
    // Jeder Text hat eigene dominante Farbe
    if (textObj.text === "TAKE") {
      textObj.r = p.random(200, 255);
      textObj.g = p.random(50, 150);
      textObj.b = p.random(50, 150);
    } else if (textObj.text === "A") {
      textObj.r = p.random(50, 150);
      textObj.g = p.random(200, 255);
      textObj.b = p.random(50, 150);
    } else {
      textObj.r = p.random(50, 150);
      textObj.g = p.random(50, 150);
      textObj.b = p.random(200, 255);
    }
  }

  // Fenstergröße anpassen
  p.windowResized = function () {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
  };
});

console.log("P5 instance created");
