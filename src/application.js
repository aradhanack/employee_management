var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { BootMixin } from '@loopback/boot';
import { RestExplorerBindings, RestExplorerComponent, } from '@loopback/rest-explorer';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import path from 'path';
import { MySequence } from './sequence';
var EmployeeApplication = /** @class */ (function (_super) {
    __extends(EmployeeApplication, _super);
    function EmployeeApplication(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        // Set up the custom sequence
        _this.sequence(MySequence);
        // Set up default home page
        _this.static('/', path.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        _this.configure(RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        _this.component(RestExplorerComponent);
        _this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        _this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
        return _this;
    }
    return EmployeeApplication;
}(BootMixin(ServiceMixin(RepositoryMixin(RestApplication)))));
export { EmployeeApplication };
