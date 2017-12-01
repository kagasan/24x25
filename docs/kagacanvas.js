class KagaCanvas{
    
        constructor(width, height, divid, canvasid, bgcolor = "#ffffff"){
            document.getElementById(divid).innerHTML = "<canvas id='" + canvasid + "'></canvas>";
            this.canvas = document.getElementById(canvasid);
            this.ctx = this.canvas.getContext('2d');
            this.canvas.height = height;
            this.canvas.width = width;
            this.ctx.fillStyle = bgcolor;
            this.ctx.fillRect(0, 0, width, height);
        }
    
        rectangle(x1, y1, x2, y2, color="#000000", thickness = 1){
            var w = x2 - x1;
            var h = y2 - y1;
            if(thickness<0){
                this.ctx.fillStyle = color;
                this.ctx.fillRect(x1, y1, w, h);
            }
            else{
                this.ctx.lineWidth = thickness;
                this.ctx.strokeStyle = color;
                this.ctx.strokeRect(x1, y1, w, h);
            }
        }
    
        circle(x, y, r, color="#000000", thickness = 1){
            if(thickness < 0){
                this.ctx.fillStyle = color;
                this.ctx.beginPath();
                this.ctx.arc(x, y, r, 0, Math.PI*2, true);
                this.ctx.fill();
            }
            else{
                this.ctx.strokeStyle = color;
                this.ctx.lineWidth = thickness;
                this.ctx.beginPath();
                this.ctx.arc(x, y, r, 0, Math.PI*2, false);
                this.ctx.stroke();
            }
        }
    
        line(x1, y1, x2, y2, color = "#000000", thickness = 1){
            this.ctx.lineWidth = thickness;
            this.ctx.strokeStyle = color;
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        }
    
        polygon(pts, color = "#000000", thickness = 1){
            if(thickness < 0){
                this.ctx.fillStyle = color;
                this.ctx.beginPath();
                this.ctx.moveTo(pts[0][0], pts[0][1]);
                for(var i = 1; i < pts.length; i++){
                    this.ctx.lineTo(pts[i][0], pts[i][1]);
                }
                this.ctx.lineTo(pts[0][0], pts[0][1]);
                this.ctx.fill();
            }
            else{
                this.ctx.strokeStyle = color;
                this.ctx.lineWidth = thickness;
                this.ctx.beginPath();
                this.ctx.moveTo(pts[0][0], pts[0][1]);
                for(var i = 1; i < pts.length; i++){
                    this.ctx.lineTo(pts[i][0], pts[i][1]);
                }
                this.ctx.lineTo(pts[0][0], pts[0][1]);
                this.ctx.stroke();
            }
        }
    
        putText(x, y, text, color = "#000000", size = 16, font = "メイリオ"){
            this.ctx.font = "" + size + "px '" + font +"'";
            this.ctx.fillStyle = color;
            this.ctx.fillText(text, x, y + size);
        }
    
        autoLine(x, y, text, color = "#000000", size=16, font="メイリオ"){
            var texts = text.split('\n');
            this.ctx.font = "" + size + "px '" + font + "'";
            this.ctx.fillStyle = color;
            for(var i = 0; i < texts.length; i++){
                this.ctx.fillText(texts[i], x, y + size + i*size);
            }
        }
    
        dataurl(){
            return this.canvas.toDataURL();
        }
    
        rgb(r, g, b){
            return "rgb(" + r + "," + g + "," + b + ")";
        }
    
        addClick(func){
            this.canvas.addEventListener("click", function(e){
                var rect = e.target.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                func(x, y);
            },false);
        }
    
        addDD(func){
            this.canvas.addEventListener('dragover', function(e){
                e.stopPropagation();
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy'
            }, false);
            this.canvas.addEventListener('drop', function(e){
                e.stopPropagation();
                e.preventDefault();
                var file = e.dataTransfer.files[0];
                var reader = new FileReader();
                reader.onload = function(){
                    func(reader.result);
                }
                reader.readAsText(file);
            }, false);
        }
    
    }