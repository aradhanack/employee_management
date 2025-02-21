var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
import { readFile, writeFile } from "fs";
import { promisify } from "util";
import xml from "xml";
import { EmployeeApplication } from './application';
export * from './application';
var readFilePromise = promisify(readFile);
var writeFilePromise = promisify(writeFile);
export function main(options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var app, url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = new EmployeeApplication(options);
                    return [4 /*yield*/, app.boot()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, app.start()];
                case 2:
                    _a.sent();
                    url = app.restServer.url;
                    console.log("Server is running at ".concat(url));
                    console.log("Try ".concat(url, "/ping"));
                    return [2 /*return*/, app];
            }
        });
    });
}
if (require.main === module) {
    // Run the application
    var config = {
        rest: {
            port: +((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000),
            host: process.env.HOST,
            // The `gracePeriodForClose` provides a graceful close for http/https
            // servers with keep-alive clients. The default value is `Infinity`
            // (don't force-close). If you want to immediately destroy all sockets
            // upon stop, set its value to `0`.
            // See https://www.npmjs.com/package/stoppable
            gracePeriodForClose: 5000,
            openApiSpec: {
                // useful when used with OpenAPI-to-GraphQL to locate your application
                setServersFromRequest: true,
            },
        },
    };
    main(config).catch(function (err) {
        console.error('Cannot start the application.', err);
        process.exit(1);
    });
    (function convertJsonToXml() {
        return __awaiter(this, void 0, void 0, function () {
            var staticSiteGenerationData, _a, _b, xmlFormattedStaticsSiteGeneratorData, staticSiteGeneratorXmlString;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, readFilePromise("./data/db.json", "utf8")];
                    case 1:
                        staticSiteGenerationData = _b.apply(_a, [_c.sent()]);
                        xmlFormattedStaticsSiteGeneratorData = [
                            {
                                staticSiteGenerators: __spreadArray([], staticSiteGenerationData.map(function (item) {
                                    return {
                                        staticSiteGenerator: [
                                            {
                                                _attr: {
                                                    firstName: item.firstName,
                                                    lastName: item.lastName,
                                                    email: item.email,
                                                    address: item.address,
                                                },
                                            },
                                            item.firstName,
                                        ],
                                    };
                                }), true),
                            },
                        ];
                        staticSiteGeneratorXmlString = xml(xmlFormattedStaticsSiteGeneratorData);
                        return [4 /*yield*/, writeFilePromise("./data/data.xml", staticSiteGeneratorXmlString, "utf8")];
                    case 2:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    })();
}
