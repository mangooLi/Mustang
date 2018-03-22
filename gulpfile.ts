import {Gulpclass, Task, SequenceTask, MergedTask} from "gulpclass";

import * as gulp from "gulp";
import * as shell from "gulp-shell";
import * as del from "del";
import * as mocha from "gulp-mocha";

@Gulpclass()
export class Gulpfile {

    /**
     * 清除build文件夹
     */
    @Task()
    clean() {
        return del(["./build/**"]);
    }

    /** 
     * 编译TS文件
    */
    @Task()
    build() {
        return  gulp.src("package.json",{read:false})
            .pipe(shell(["npm run build"]));
    }

    @Task()
    test() {
        return gulp.src(['./test/**/*.ts'])
            .pipe(mocha({
                bail: true,
                timeout: 15000,
                require: ['./node_modules/ts-node/register']
            }));
    }
}