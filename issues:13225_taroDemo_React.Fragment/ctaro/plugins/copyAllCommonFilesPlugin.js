const fs = require('fs-extra')
const path = require("path");
const {RawSource} = require("webpack-sources")
const root = path.join(__dirname, "../");
const handlerCommonModule = require("./handlerCommonModule");
const PLUGIN_NAME = 'CopyAllCommonFilesPlugin';
const correctionPath = require("./utils/correctionPath");

class CopyAllCommonFilesPlugin {
  constructor(options) {
    this.chunkFiles = {}
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      compilation.hooks.afterOptimizeChunks.tap(PLUGIN_NAME, (chunks) => {
        chunks.forEach((chunk) => {
          const modules = Array.from(chunk.modulesIterable);
          modules.map((module) => {
            if (module.resource || module._identifier) {
              const filePath = correctionPath(path.relative(root, module.resource || module._identifier));
              if (!this.chunkFiles[chunk.name]) {
                this.chunkFiles[chunk.name] = [];
              }
              if (!this.chunkFiles[chunk.name].includes(filePath)) {
                this.chunkFiles[chunk.name].push(filePath)
              }
            }
          })
        });

      });
      compilation.hooks.afterOptimizeAssets.tap(PLUGIN_NAME, (asserts) => {
        //todo? 此处修改产物，做ast解析，修改模块引用路径，如果有相对路径文件，也要放到上述目录
        // console.log("assert:",asserts);
        console.log(this.options);
        const {entryFile, outputPath} = this.options
        const rootDir = path.dirname(entryFile);
        const taroBaseDir = path.join(rootDir,"src/taroCwx/base.js");
        const commonModulePath = path.join(outputPath, "common_module_dir");
        // console.log("asserts: ",asserts);
        const outputAssertName = "commonModule.prod.js";
        if(asserts[outputAssertName]){
          const realFilePath = path.join(rootDir, "commonModule.js")
          const commonModuleProdPath = path.join(outputPath, outputAssertName)
          const newContent = handlerCommonModule(realFilePath, commonModulePath, commonModuleProdPath);
          asserts[outputAssertName] = new RawSource(newContent);
        }
        for(let pro in this.chunkFiles){
          if (this.chunkFiles[pro].length) {
            this.chunkFiles[pro].forEach(function (file) {
              const realFilePath = path.join(rootDir, file)
              const outputFilePath = path.join(commonModulePath, file);
              if (file !== "commonModule.js") {
                if (fs.existsSync(realFilePath)) {
                  fs.copySync(realFilePath, outputFilePath);
                  const realExtname = path.extname(outputFilePath);
                  if(realExtname === ".js" || realExtname === ".jsx" || realExtname === ".ts" || realExtname === ".tsx"){
                    const newContent = handlerCommonModule(outputFilePath, commonModulePath,null,taroBaseDir);
                    fs.writeFileSync(outputFilePath, newContent, "utf-8")
                  }
                } else {
                  // console.error(`${realFilePath} Not Found.`);
                }
              } else {

              }
            })
          }
        }
      })
    })
  }
}

module.exports = CopyAllCommonFilesPlugin;
