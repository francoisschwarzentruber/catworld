var Scene = /** @class */ (function () {
    function Scene() {
        var _this = this;
        this.img = new Image();
        // this.img.src = "./scenetest.png";
        this.img.src = "./scene_francois.png";
        this.img.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = _this.img.width;
            canvas.height = _this.img.height;
            _this.context = canvas.getContext('2d');
            _this.context.fillStyle = "#FFFFFF";
            _this.context.fillRect(0, 0, _this.img.width, _this.img.height);
            _this.context.drawImage(_this.img, 0, 0);
        };
    }
    Object.defineProperty(Scene.prototype, "width", {
        get: function () {
            return this.img.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "height", {
        get: function () {
            return this.img.height;
        },
        enumerable: true,
        configurable: true
    });
    Scene.prototype.getPixel = function (x, y) {
        return this.context.getImageData(x, y, 1, 1).data[0];
    };
    Scene.prototype.draw = function (context) {
        context.drawImage(this.img, 0, 0);
    };
    /**
     *
     * @param obj
     * @returns a vector where to move the guy
     */
    Scene.prototype.getGoodPositionScore = function (obj) {
        var _this = this;
        var isObstacle = function (x, y) {
            return _this.getPixel(x + obj.position.x, y + obj.position.y) < 32;
        };
        var getFloorLevel = function (x) {
            for (var y = -obj.size / 2; y < obj.size / 2; y++)
                if (isObstacle(x, y) && !isObstacle(x, y - 1)) {
                    return y;
                }
            return obj.size / 2;
        };
        var FACTOR = 32 * 32;
        var SIZE = obj.size;
        var v = { x: 0, y: 0, onFloor: false, angle: 0.0 };
        for (var x = -SIZE / 2; x < SIZE / 2; x++)
            for (var y = -SIZE / 2; y < SIZE / 2; y++)
                if (isObstacle(x, y)) {
                    v.x += -x;
                    v.y += -y;
                }
        v.x /= FACTOR;
        v.y /= FACTOR;
        var y1 = getFloorLevel(-obj.size / 2);
        var y2 = getFloorLevel(obj.size / 2);
        v.angle = Math.atan2(y2 - y1, obj.size);
        v.onFloor = (v.y < 0);
        //if(Math.abs(v.x) < 0.1) v.x = 0;
        //if(Math.abs(v.y) < 0.1) v.y = 0;
        return v;
    };
    return Scene;
}());
export { Scene };
//# sourceMappingURL=Scene.js.map