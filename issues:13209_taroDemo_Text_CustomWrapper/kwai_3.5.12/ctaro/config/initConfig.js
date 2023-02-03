const path = require("path");
const fs = require("fs");
const appConfigPath = path.join(__dirname, "../src/app.config.js")
const appJsonPath = path.join(__dirname, "../app.json")
const taroAppBaseInfo = path.join(__dirname, "../taroAppBaseInfo.js")

function initConfig() {
    let appJSON;
    if (fs.existsSync(appJsonPath)) {
        appJSON = require(appJsonPath);
    } else if (fs.existsSync(appConfigPath)) {
        appJSON = require(appConfigPath);
    } else {
        throw new Error("No Config Found!");
    }
    const pages = appJSON.pages || [];
    const subPackages = appJSON.subPackages || [];
    const chunkInfo = {
        pages,
        subPackages
    };
    return chunkInfo;
}

function combineExtendsConfig() {
    const eConfig = {
        alias: {},
        externals: [],
        babelConfig: {
            plugins: []
        }
    };
    const files = fs.readdirSync(__dirname);
    files.forEach(function (fileName) {
        const filePath = path.join(__dirname, fileName);
        const stat = fs.statSync(filePath);
        const match = fileName.match(/(\S*)extends\.js/);
        if (!stat.isDirectory() && match) {
            const {alias = {}, externals = [], babelConfig = {}} = require(filePath);
            //externals 无法判断直接添加
            eConfig.externals = [].concat(eConfig.externals, externals);
            //检查alias是否重名
            Object.keys(alias).forEach(function (key) {
                if (eConfig[key]) {
                    //已经添加过
                    throw new Error(`bundle:${match[1]}Alias ${key} Already Exists. `);
                } else {
                    eConfig.alias[key] = alias[key]
                }
            });
            // 读取 babelConfig 里的 plugins 配置，合并
            if (babelConfig && babelConfig.plugins && babelConfig.plugins.length) {
                // todo??? 是否需要判断使用的 plugins 重复的情况？是否需要合并配置？
                eConfig.babelConfig.plugins = [].concat(eConfig.babelConfig.plugins, babelConfig.plugins);
            }
        }
    });
    return eConfig;
}


function getTaroAppBaseInfo() {
  if (!fs.existsSync(taroAppBaseInfo)) {
    return {};
  }
  try {
    return require(taroAppBaseInfo);
  } catch (e) {
    return {};
  }
}

//todo？此处要提供合并多个taro项目的app.config.js到主taro项目，另外还要提供package.json中 dependancy的合并


module.exports = {...initConfig(), ...combineExtendsConfig(), ...getTaroAppBaseInfo()};
