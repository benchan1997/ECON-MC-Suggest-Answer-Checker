window.mobilecheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

(function () {
    /*

      Music is by The XX
      @see http://thexx.info

      This is best viewed in Chrome since there is a bug in Safari
      when using getByteFrequencyData with MediaElementAudioSource

      @see https://goo.gl/6WLx1

    */
    var ALPHA, AudioAnalyser, COLORS, MP3_PATH, NUM_BANDS, NUM_PARTICLES, Particle, SCALE, SIZE, SMOOTHING, SPEED, SPIN;



    if(window.mobilecheck){
        // Config
        NUM_PARTICLES = 75;

        NUM_BANDS = 128;

        SMOOTHING = 0.1;

        MP3_PATH = 'assets/[Dubstep] Zetta - Greensleeves.mp3';

        SCALE = {
            MIN: 1.0,
            MAX: 20.0
        };

        SPEED = {
            MIN: 0.2,
            MAX: 1.0
        };

        ALPHA = {
            MIN: 0.3,
            MAX: 0.8
        };

        SPIN = {
            MIN: 0.001,
            MAX: 0.005
        };

        SIZE = {
            MIN: 0.01,
            MAX: 0.01
        };
    }else{
        // Config
        NUM_PARTICLES = 150;

        NUM_BANDS = 128;

        SMOOTHING = 0.1;

        MP3_PATH = 'assets/[Dubstep] Zetta - Greensleeves.mp3';

        SCALE = {
            MIN: 1.0,
            MAX: 30.0
        };

        SPEED = {
            MIN: 0.2,
            MAX: 1.0
        };

        ALPHA = {
            MIN: 0.3,
            MAX: 0.8
        };

        SPIN = {
            MIN: 0.001,
            MAX: 0.005
        };

        SIZE = {
            MIN: 0.01,
            MAX: 0.01
        };
    }

    COLORS = ['#69D2E7', '#1B676B', '#BEF202', '#EBE54D', '#00CDAC', '#1693A5', '#F9D423', '#FF4E50', '#E7204E', '#0CCABA', '#FF006F'];

    AudioAnalyser = (function () {
        // Audio Analyser
        class AudioAnalyser {
            constructor(audio = new Audio(), numBands = 256, smoothing = 0.3) {
                var src;
                this.playStatus;
                this.audio = audio;
                this.numBands = numBands;
                this.smoothing = smoothing;

                // construct audio object
                if (typeof this.audio === 'string') {
                    src = this.audio;
                    this.audio = new Audio();
                    this.audio.crossOrigin = "anonymous";
                    this.audio.controls = false;
                    this.audio.src = src;
                    this.audio.addEventListener('ended', function() {
                        this.currentTime = 0;
                        this.play();
                    }, false);
                }

                // setup audio context and nodes
                this.context = new AudioAnalyser.AudioContext();

                // createScriptProcessor so we can hook onto updates
                this.jsNode = this.context.createScriptProcessor(2048, 1, 1);

                // smoothed analyser with n bins for frequency-domain analysis
                this.analyser = this.context.createAnalyser();
                this.analyser.smoothingTimeConstant = this.smoothing;
                this.analyser.fftSize = this.numBands * 2;

                // persistant bands array
                this.bands = new Uint8Array(this.analyser.frequencyBinCount);
                // circumvent http://crbug.com/112368
                this.audio.addEventListener('canplay', () => {

                    // media source
                    this.source = this.context.createMediaElementSource(this.audio);
                    // wire up nodes
                    this.source.connect(this.analyser);
                    this.analyser.connect(this.jsNode);
                    this.jsNode.connect(this.context.destination);
                    this.source.connect(this.context.destination);
                    // update each time the JavaScriptNode is called
                    return this.jsNode.onaudioprocess = () => {
                        // retreive the data from the first channel
                        this.analyser.getByteFrequencyData(this.bands);
                        if (!this.audio.paused) {
                            return typeof this.onUpdate === "function" ? this.onUpdate(this.bands) : void 0;
                        }
                    };
                });
            }

            start() {
                this.playStatus = true;
                this.audio.play();
                $("#volume").html('<i class="fa fa-volume-off" aria-hidden="true"></i>');
            }

            stop() {
                this.playStatus = false;
                this.audio.pause();
                $("#volume").html('<i class="fa fa-volume-up" aria-hidden="true"></i>');
            }

            toggle() {
                this.playStatus === true ? this.stop() : this.start();
            }

        };

        AudioAnalyser.AudioContext = self.AudioContext || self.webkitAudioContext;

        AudioAnalyser.enabled = AudioAnalyser.AudioContext != null;

        return AudioAnalyser;

    }).call(this);


    // Particle
    Particle = class Particle {
        constructor(x1 = 0, y1 = 0) {
            this.x = x1;
            this.y = y1;
            this.reset();
        }

        reset() {
            this.level = 1 + floor(random(4));
            this.scale = random(SCALE.MIN, SCALE.MAX);
            this.alpha = random(ALPHA.MIN, ALPHA.MAX);
            this.speed = random(SPEED.MIN, SPEED.MAX);
            this.color = random(COLORS);
            this.size = random(SIZE.MIN, SIZE.MAX);
            this.spin = random(SPIN.MAX, SPIN.MAX);
            this.band = floor(random(NUM_BANDS));
            if (random() < 0.5) {
                this.spin = -this.spin;
            }
            this.smoothedScale = 0.0;
            this.smoothedAlpha = 0.0;
            this.decayScale = 0.0;
            this.decayAlpha = 0.0;
            this.rotation = random(TWO_PI);
            return this.energy = 0.0;
        }

        move() {
            this.rotation += this.spin;
            return this.y -= this.speed * this.level;
        }

        draw(ctx) {
            var alpha, power, scale;
            power = exp(this.energy);
            scale = this.scale * power;
            alpha = this.alpha * this.energy * 1.5;
            this.decayScale = max(this.decayScale, scale);
            this.decayAlpha = max(this.decayAlpha, alpha);
            this.smoothedScale += (this.decayScale - this.smoothedScale) * 0.3;
            this.smoothedAlpha += (this.decayAlpha - this.smoothedAlpha) * 0.3;
            this.decayScale *= 0.985;
            this.decayAlpha *= 0.975;
            ctx.save();
            ctx.beginPath();
            ctx.translate(this.x + cos(this.rotation * this.speed) * 250, this.y);
            ctx.rotate(this.rotation);
            ctx.scale(this.smoothedScale * this.level, this.smoothedScale * this.level);
            ctx.moveTo(this.size * 0.5, 0);
            ctx.lineTo(this.size * -0.5, 0);
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
            ctx.globalAlpha = this.smoothedAlpha / this.level;
            ctx.strokeStyle = this.color;
            ctx.stroke();
            return ctx.restore();
        }

    };


    // Sketch
    Sketch.create({
        particles: [],
        setup: function () {
            var analyser, error, i, intro, j, particle, ref, warning, x, y;

// generate some particles
            for (i = j = 0, ref = NUM_PARTICLES - 1; j <= ref; i = j += 1) {
                x = random(this.width);
                y = random(this.height * 2);
                particle = new Particle(x, y);
                particle.energy = random(particle.band / 256);
                this.particles.push(particle);
            }
            if (AudioAnalyser.enabled) {
                try {
                    // setup the audio analyser
                    analyser = new AudioAnalyser(MP3_PATH, NUM_BANDS, SMOOTHING);
                    // update particles based on fft transformed audio frequencies
                    analyser.onUpdate = (bands) => {
                        var k, len, ref1, results;
                        ref1 = this.particles;
                        results = [];
                        for (k = 0, len = ref1.length; k < len; k++) {
                            particle = ref1[k];
                            results.push(particle.energy = bands[particle.band] / 256);
                        }
                        return results;
                    };

                    $("#volume").click(function () {
                        analyser.toggle();
                    });

                    if(window.mobilecheck()){
                        analyser.stop();
                    }else{
                        // start as soon as the audio is buffered
                        // analyser.start();
                    }
                    document.body.appendChild(analyser.audio);
                    intro = document.getElementById('intro');
                    intro.style.display = 'none';

                    // bug in Safari 6 when using getByteFrequencyData with MediaElementAudioSource
                    // @see https://goo.gl/6WLx1
                    if (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) {
                        // warning = document.getElementById('warning2');
                        // return warning.style.display = 'block';
                    }
                } catch (error1) {
                    error = error1;
                }
            } else {

                // Web Audio API not detected
                warning = document.getElementById('warning1');
                return warning.style.display = 'block';
            }
        },
        draw: function () {
            var j, len, particle, ref, results;
            this.globalCompositeOperation = 'lighter';
            ref = this.particles;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
                particle = ref[j];

                // recycle particles
                if (particle.y < -particle.size * particle.level * particle.scale * 2) {
                    particle.reset();
                    particle.x = random(this.width);
                    particle.y = this.height + particle.size * particle.scale * particle.level;
                }
                particle.move();
                results.push(particle.draw(this));
            }
            return results;
        }
    });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQTs7Ozs7Ozs7Ozs7QUFBQSxNQUFBLEtBQUEsRUFBQSxhQUFBLEVBQUEsTUFBQSxFQUFBLFFBQUEsRUFBQSxTQUFBLEVBQUEsYUFBQSxFQUFBLFFBQUEsRUFBQSxLQUFBLEVBQUEsSUFBQSxFQUFBLFNBQUEsRUFBQSxLQUFBLEVBQUEsSUFBQTs7O0VBY0EsYUFBQSxHQUFnQjs7RUFDaEIsU0FBQSxHQUFZOztFQUNaLFNBQUEsR0FBWTs7RUFDWixRQUFBLEdBQVc7O0VBRVgsS0FBQSxHQUFRO0lBQUEsR0FBQSxFQUFLLEdBQUw7SUFBVyxHQUFBLEVBQUs7RUFBaEI7O0VBQ1IsS0FBQSxHQUFRO0lBQUEsR0FBQSxFQUFLLEdBQUw7SUFBWSxHQUFBLEVBQUs7RUFBakI7O0VBQ1IsS0FBQSxHQUFRO0lBQUEsR0FBQSxFQUFLLEdBQUw7SUFBWSxHQUFBLEVBQUs7RUFBakI7O0VBQ1IsSUFBQSxHQUFRO0lBQUEsR0FBQSxFQUFLLEtBQUw7SUFBWSxHQUFBLEVBQUs7RUFBakI7O0VBQ1IsSUFBQSxHQUFRO0lBQUEsR0FBQSxFQUFLLEdBQUw7SUFBWSxHQUFBLEVBQUs7RUFBakI7O0VBRVIsTUFBQSxHQUFTLENBQ1AsU0FETyxFQUVQLFNBRk8sRUFHUCxTQUhPLEVBSVAsU0FKTyxFQUtQLFNBTE8sRUFNUCxTQU5PLEVBT1AsU0FQTyxFQVFQLFNBUk8sRUFTUCxTQVRPLEVBVVAsU0FWTyxFQVdQLFNBWE87O0VBZ0JIOztJQUFOLE1BQUEsY0FBQTtNQUtFLFdBQWEsU0FBVyxJQUFJLEtBQUosQ0FBQSxDQUFYLGFBQW9DLEdBQXBDLGNBQXNELEdBQXRELENBQUE7QUFHWCxZQUFBO1FBSGEsSUFBQyxDQUFBO1FBQXFCLElBQUMsQ0FBQTtRQUFnQixJQUFDLENBQUEsc0JBR3JEOzs7UUFBQSxJQUFHLE9BQU8sSUFBQyxDQUFBLEtBQVIsS0FBaUIs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O0FBcktBIiwic291cmNlc0NvbnRlbnQiOlsiIyMjXG5cbiAgTXVzaWMgaXMgYnkgVGhlIFhYXG4gIEBzZWUgaHR0cDovL3RoZXh4LmluZm9cblxuICBUaGlzIGlzIGJlc3Qgdmlld2VkIGluIENocm9tZSBzaW5jZSB0aGVyZSBpcyBhIGJ1ZyBpbiBTYWZhcmlcbiAgd2hlbiB1c2luZyBnZXRCeXRlRnJlcXVlbmN5RGF0YSB3aXRoIE1lZGlhRWxlbWVudEF1ZGlvU291cmNlXG5cbiAgQHNlZSBodHRwczovL2dvby5nbC82V0x4MVxuXG4jIyNcblxuIyBDb25maWdcblxuTlVNX1BBUlRJQ0xFUyA9IDE1MFxuTlVNX0JBTkRTID0gMTI4XG5TTU9PVEhJTkcgPSAwLjVcbk1QM19QQVRIID0gJ2h0dHBzOi8vYXBpLnNvdW5kY2xvdWQuY29tL3RyYWNrcy80MjMyODIxOS9zdHJlYW0/Y2xpZW50X2lkPWIxNDk1ZTM5MDcxYmQ3MDgxYTc0MDkzODE2Zjc3ZGRiJ1xuXG5TQ0FMRSA9IE1JTjogNS4wLCAgTUFYOiA4MC4wXG5TUEVFRCA9IE1JTjogMC4yLCAgIE1BWDogMS4wXG5BTFBIQSA9IE1JTjogMC44LCAgIE1BWDogMC45XG5TUElOICA9IE1JTjogMC4wMDEsIE1BWDogMC4wMDVcblNJWkUgID0gTUlOOiAwLjUsICAgTUFYOiAxLjI1XG5cbkNPTE9SUyA9IFtcbiAgJyM2OUQyRTcnXG4gICcjMUI2NzZCJ1xuICAnI0JFRjIwMidcbiAgJyNFQkU1NEQnXG4gICcjMDBDREFDJ1xuICAnIzE2OTNBNSdcbiAgJyNGOUQ0MjMnXG4gICcjRkY0RTUwJ1xuICAnI0U3MjA0RSdcbiAgJyMwQ0NBQkEnXG4gICcjRkYwMDZGJ1xuXVxuXG4jIEF1ZGlvIEFuYWx5c2VyXG5cbmNsYXNzIEF1ZGlvQW5hbHlzZXJcbiAgXG4gIEBBdWRpb0NvbnRleHQ6IHNlbGYuQXVkaW9Db250ZXh0IG9yIHNlbGYud2Via2l0QXVkaW9Db250ZXh0XG4gIEBlbmFibGVkOiBAQXVkaW9Db250ZXh0P1xuICBcbiAgY29uc3RydWN0b3I6ICggQGF1ZGlvID0gbmV3IEF1ZGlvKCksIEBudW1CYW5kcyA9IDI1NiwgQHNtb290aGluZyA9IDAuMyApIC0+XG4gIFxuICAgICMgY29uc3RydWN0IGF1ZGlvIG9iamVjdFxuICAgIGlmIHR5cGVvZiBAYXVkaW8gaXMgJ3N0cmluZydcbiAgICAgIHNyYyA9IEBhdWRpb1xuICAgICAgQGF1ZGlvID0gbmV3IEF1ZGlvKClcbiAgICAgIEBhdWRpby5jcm9zc09yaWdpbiA9IFwiYW5vbnltb3VzXCJcbiAgICAgIEBhdWRpby5jb250cm9scyA9IHllc1xuICAgICAgQGF1ZGlvLnNyYyA9IHNyY1xuICBcbiAgICAjIHNldHVwIGF1ZGlvIGNvbnRleHQgYW5kIG5vZGVzXG4gICAgQGNvbnRleHQgPSBuZXcgQXVkaW9BbmFseXNlci5BdWRpb0NvbnRleHQoKVxuICAgIFxuICAgICMgY3JlYXRlU2NyaXB0UHJvY2Vzc29yIHNvIHdlIGNhbiBob29rIG9udG8gdXBkYXRlc1xuICAgIEBqc05vZGUgPSBAY29udGV4dC5jcmVhdGVTY3JpcHRQcm9jZXNzb3IgMjA0OCwgMSwgMVxuICAgIFxuICAgICMgc21vb3RoZWQgYW5hbHlzZXIgd2l0aCBuIGJpbnMgZm9yIGZyZXF1ZW5jeS1kb21haW4gYW5hbHlzaXNcbiAgICBAYW5hbHlzZXIgPSBAY29udGV4dC5jcmVhdGVBbmFseXNlcigpXG4gICAgQGFuYWx5c2VyLnNtb290aGluZ1RpbWVDb25zdGFudCA9IEBzbW9vdGhpbmdcbiAgICBAYW5hbHlzZXIuZmZ0U2l6ZSA9IEBudW1CYW5kcyAqIDJcbiAgICBcbiAgICAjIHBlcnNpc3RhbnQgYmFuZHMgYXJyYXlcbiAgICBAYmFuZHMgPSBuZXcgVWludDhBcnJheSBAYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnRcblxuICAgICMgY2lyY3VtdmVudCBodHRwOi8vY3JidWcuY29tLzExMjM2OFxuICAgIEBhdWRpby5hZGRFdmVudExpc3RlbmVyICdjYW5wbGF5JywgPT5cbiAgICBcbiAgICAgICMgbWVkaWEgc291cmNlXG4gICAgICBAc291cmNlID0gQGNvbnRleHQuY3JlYXRlTWVkaWFFbGVtZW50U291cmNlIEBhdWRpb1xuXG4gICAgICAjIHdpcmUgdXAgbm9kZXNcblxuICAgICAgQHNvdXJjZS5jb25uZWN0IEBhbmFseXNlclxuICAgICAgQGFuYWx5c2VyLmNvbm5lY3QgQGpzTm9kZVxuXG4gICAgICBAanNOb2RlLmNvbm5lY3QgQGNvbnRleHQuZGVzdGluYXRpb25cbiAgICAgIEBzb3VyY2UuY29ubmVjdCBAY29udGV4dC5kZXN0aW5hdGlvblxuXG4gICAgICAjIHVwZGF0ZSBlYWNoIHRpbWUgdGhlIEphdmFTY3JpcHROb2RlIGlzIGNhbGxlZFxuICAgICAgQGpzTm9kZS5vbmF1ZGlvcHJvY2VzcyA9ID0+XG5cbiAgICAgICAgIyByZXRyZWl2ZSB0aGUgZGF0YSBmcm9tIHRoZSBmaXJzdCBjaGFubmVsXG4gICAgICAgIEBhbmFseXNlci5nZXRCeXRlRnJlcXVlbmN5RGF0YSBAYmFuZHNcbiAgICAgICAgXG4gICAgICAgICMgZmlyZSBjYWxsYmFja1xuICAgICAgICBAb25VcGRhdGU/IEBiYW5kcyBpZiBub3QgQGF1ZGlvLnBhdXNlZFxuICAgICAgICBcbiAgc3RhcnQ6IC0+XG4gIFxuICAgIEBhdWRpby5wbGF5KClcbiAgICBcbiAgc3RvcDogLT5cbiAgXG4gICAgQGF1ZGlvLnBhdXNlKClcbiAgICBcbiMgUGFydGljbGVcblxuY2xhc3MgUGFydGljbGVcbiAgXG4gIGNvbnN0cnVjdG9yOiAoIEB4ID0gMCwgQHkgPSAwICkgLT5cblxuICAgIEByZXNldCgpXG4gICAgXG4gIHJlc2V0OiAtPlxuICBcbiAgICBAbGV2ZWwgPSAxICsgZmxvb3IgcmFuZG9tIDRcbiAgICBAc2NhbGUgPSByYW5kb20gU0NBTEUuTUlOLCBTQ0FMRS5NQVhcbiAgICBAYWxwaGEgPSByYW5kb20gQUxQSEEuTUlOLCBBTFBIQS5NQVhcbiAgICBAc3BlZWQgPSByYW5kb20gU1BFRUQuTUlOLCBTUEVFRC5NQVhcbiAgICBAY29sb3IgPSByYW5kb20gQ09MT1JTXG4gICAgQHNpemUgPSByYW5kb20gU0laRS5NSU4sIFNJWkUuTUFYXG4gICAgQHNwaW4gPSByYW5kb20gU1BJTi5NQVgsIFNQSU4uTUFYXG4gICAgQGJhbmQgPSBmbG9vciByYW5kb20gTlVNX0JBTkRTXG4gICAgXG4gICAgaWYgcmFuZG9tKCkgPCAwLjUgdGhlbiBAc3BpbiA9IC1Ac3BpblxuICAgIFxuICAgIEBzbW9vdGhlZFNjYWxlID0gMC4wXG4gICAgQHNtb290aGVkQWxwaGEgPSAwLjBcbiAgICBAZGVjYXlTY2FsZSA9IDAuMFxuICAgIEBkZWNheUFscGhhID0gMC4wXG4gICAgQHJvdGF0aW9uID0gcmFuZG9tIFRXT19QSVxuICAgIEBlbmVyZ3kgPSAwLjBcbiAgICBcbiAgbW92ZTogLT5cbiAgXG4gICAgQHJvdGF0aW9uICs9IEBzcGluXG4gICAgQHkgLT0gQHNwZWVkICogQGxldmVsXG4gICAgXG4gIGRyYXc6ICggY3R4ICkgLT5cbiAgICBcbiAgICBwb3dlciA9IGV4cCBAZW5lcmd5XG4gICAgc2NhbGUgPSBAc2NhbGUgKiBwb3dlclxuICAgIGFscGhhID0gQGFscGhhICogQGVuZXJneSAqIDEuNVxuICAgIFxuICAgIEBkZWNheVNjYWxlID0gbWF4IEBkZWNheVNjYWxlLCBzY2FsZVxuICAgIEBkZWNheUFscGhhID0gbWF4IEBkZWNheUFscGhhLCBhbHBoYVxuICAgIFxuICAgIEBzbW9vdGhlZFNjYWxlICs9ICggQGRlY2F5U2NhbGUgLSBAc21vb3RoZWRTY2FsZSApICogMC4zXG4gICAgQHNtb290aGVkQWxwaGEgKz0gKCBAZGVjYXlBbHBoYSAtIEBzbW9vdGhlZEFscGhhICkgKiAwLjNcbiAgICBcbiAgICBAZGVjYXlTY2FsZSAqPSAwLjk4NVxuICAgIEBkZWNheUFscGhhICo9IDAuOTc1XG4gIFxuICAgIGN0eC5zYXZlKClcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHgudHJhbnNsYXRlIEB4ICsgY29zKCBAcm90YXRpb24gKiBAc3BlZWQgKSAqIDI1MCwgQHlcbiAgICBjdHgucm90YXRlIEByb3RhdGlvblxuICAgIGN0eC5zY2FsZSBAc21vb3RoZWRTY2FsZSAqIEBsZXZlbCwgQHNtb290aGVkU2NhbGUgKiBAbGV2ZWxcbiAgICBjdHgubW92ZVRvIEBzaXplICogMC41LCAwXG4gICAgY3R4LmxpbmVUbyBAc2l6ZSAqIC0wLjUsIDBcbiAgICBjdHgubGluZVdpZHRoID0gMVxuICAgIGN0eC5saW5lQ2FwID0gJ3JvdW5kJ1xuICAgIGN0eC5nbG9iYWxBbHBoYSA9IEBzbW9vdGhlZEFscGhhIC8gQGxldmVsXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gQGNvbG9yXG4gICAgY3R4LnN0cm9rZSgpXG4gICAgY3R4LnJlc3RvcmUoKVxuICAgIFxuIyBTa2V0Y2hcbiAgICBcblNrZXRjaC5jcmVhdGVcblxuICBwYXJ0aWNsZXM6IFtdXG4gIFxuICBzZXR1cDogLT5cbiAgICBcbiAgICAjIGdlbmVyYXRlIHNvbWUgcGFydGljbGVzXG4gICAgZm9yIGkgaW4gWzAuLk5VTV9QQVJUSUNMRVMtMV0gYnkgMVxuICAgICAgXG4gICAgICB4ID0gcmFuZG9tIEB3aWR0aFxuICAgICAgeSA9IHJhbmRvbSBAaGVpZ2h0ICogMlxuICAgICAgXG4gICAgICBwYXJ0aWNsZSA9IG5ldyBQYXJ0aWNsZSB4LCB5XG4gICAgICBwYXJ0aWNsZS5lbmVyZ3kgPSByYW5kb20gcGFydGljbGUuYmFuZCAvIDI1NlxuICAgICAgXG4gICAgICBAcGFydGljbGVzLnB1c2ggcGFydGljbGVcbiAgICAgIFxuICAgIGlmIEF1ZGlvQW5hbHlzZXIuZW5hYmxlZFxuICAgICAgXG4gICAgICB0cnlcblxuICAgICAgICAjIHNldHVwIHRoZSBhdWRpbyBhbmFseXNlclxuICAgICAgICBhbmFseXNlciA9IG5ldyBBdWRpb0FuYWx5c2VyIE1QM19QQVRILCBOVU1fQkFORFMsIFNNT09USElOR1xuXG4gICAgICAgICMgdXBkYXRlIHBhcnRpY2xlcyBiYXNlZCBvbiBmZnQgdHJhbnNmb3JtZWQgYXVkaW8gZnJlcXVlbmNpZXNcbiAgICAgICAgYW5hbHlzZXIub25VcGRhdGUgPSAoIGJhbmRzICkgPT4gcGFydGljbGUuZW5lcmd5ID0gYmFuZHNbIHBhcnRpY2xlLmJhbmQgXSAvIDI1NiBmb3IgcGFydGljbGUgaW4gQHBhcnRpY2xlc1xuICAgICAgICBcbiAgICAgICAgIyBzdGFydCBhcyBzb29uIGFzIHRoZSBhdWRpbyBpcyBidWZmZXJlZFxuICAgICAgICBhbmFseXNlci5zdGFydCgpO1xuICAgICAgXG4gICAgICAgICMgc2hvdyBhdWRpbyBjb250cm9sc1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkIGFuYWx5c2VyLmF1ZGlvXG4gICAgICAgIFxuICAgICAgICBpbnRybyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICdpbnRybydcbiAgICAgICAgaW50cm8uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICBcbiAgICAgICAgIyBidWcgaW4gU2FmYXJpIDYgd2hlbiB1c2luZyBnZXRCeXRlRnJlcXVlbmN5RGF0YSB3aXRoIE1lZGlhRWxlbWVudEF1ZGlvU291cmNlXG4gICAgICAgICMgQHNlZSBodHRwczovL2dvby5nbC82V0x4MVxuICAgICAgICBpZiAvU2FmYXJpLy50ZXN0KCBuYXZpZ2F0b3IudXNlckFnZW50ICkgYW5kIG5vdCAvQ2hyb21lLy50ZXN0KCBuYXZpZ2F0b3IudXNlckFnZW50IClcbiAgICAgICAgXG4gICAgICAgICAgd2FybmluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICd3YXJuaW5nMidcbiAgICAgICAgICB3YXJuaW5nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG5cbiAgICAgIGNhdGNoIGVycm9yXG4gICAgICBcbiAgICBlbHNlXG4gICAgICBcbiAgICAgICMgV2ViIEF1ZGlvIEFQSSBub3QgZGV0ZWN0ZWRcbiAgICAgIHdhcm5pbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAnd2FybmluZzEnXG4gICAgICB3YXJuaW5nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgXG4gIGRyYXc6IC0+XG4gIFxuICAgIEBnbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnbGlnaHRlcidcbiAgXG4gICAgZm9yIHBhcnRpY2xlIGluIEBwYXJ0aWNsZXNcbiAgICAgIFxuICAgICAgIyByZWN5Y2xlIHBhcnRpY2xlc1xuICAgICAgaWYgcGFydGljbGUueSA8IC1wYXJ0aWNsZS5zaXplICogcGFydGljbGUubGV2ZWwgKiBwYXJ0aWNsZS5zY2FsZSAqIDJcbiAgICAgICAgXG4gICAgICAgIHBhcnRpY2xlLnJlc2V0KCk7XG4gICAgICAgIHBhcnRpY2xlLnggPSByYW5kb20gQHdpZHRoXG4gICAgICAgIHBhcnRpY2xlLnkgPSBAaGVpZ2h0ICsgcGFydGljbGUuc2l6ZSAqIHBhcnRpY2xlLnNjYWxlICogcGFydGljbGUubGV2ZWxcbiAgICAgIFxuICAgICAgcGFydGljbGUubW92ZSgpXG4gICAgICBwYXJ0aWNsZS5kcmF3IEAiXX0=
//# sourceURL=coffeescript
