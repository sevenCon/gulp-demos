var gulp = require("gulp");
var spriteSmith = require("gulp.spriteSmith");

gulp.task("spritesmith",function(){
	var spritesData = gulp.src("./img/icons/*.png").pipe(spriteSmith({
		imgName: 'sprites.png',     // 生成的图片
        cssName: 'sprite.less',    // 生成的less文件
        imgPath: './../img/sprites.png', // less文件引用的合成图片的的地址
        padding: 5,              // 图标之间的距离
        algorithm: 'top-down', // 图标的排序方式
	}));

	spritesData.img.pipe(gulp.dest('./img/'));
	spritesData.css.pipe(gulp.dest('./css/'));
});

