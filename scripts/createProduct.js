"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");

var ProductModel_1 = require("../lib/models/ProductModel"); // Adjust path as needed

// Multiple product data to insert
var products = [
    // {
    //     name: 'Elegant Wedding Dress',
    //     slug: 'elegant-wedding-dress',
    //     image: 'https://res.cloudinary.com/generative-ai-demos/image/upload/c_auto,w_1000,ar_0.54,g_auto/v1709925707/samples/c_auto/woman_car_srgx4k.jpg',
    //     price: 199.99,
    //     brand: 'Bridal Dreams',
    //     description: 'A luxurious wedding dress for your special day.',
    //     category: 'Wedding',
    //     rating: 4.8,
    //     numReviews: 230,
    //     countInStock: 10,
    //     colors: ['White', 'Ivory'],
    //     sizes: ['S', 'M', 'L'],
    // },
    // {
    //     name: 'Elegant Necklace',
    //     slug: 'elegant-necklace',
    //     image: 'https://res.cloudinary.com/generative-ai-demos/image/upload/c_auto,w_1000,ar_0.54,g_auto/v1709925707/samples/c_auto/woman_car_srgx4k.jpg',
    //     price: 149.99,
    //     brand: 'Luxury Jewels',
    //     description: 'A stunning diamond-styled necklace for all occasions.',
    //     category: 'Jewellary',
    //     rating: 4.7,
    //     numReviews: 95,
    //     countInStock: 25,
    //     colors: ['Silver', 'Gold'],
    //     sizes: ['Standard'],
    // },
    // {
    //     name: 'Kurta',
    //     slug: 'trendy-womens-Kurta',
    //     image: 'https://res.cloudinary.com/generative-ai-demos/image/upload/c_auto,w_1000,ar_0.54,g_auto/v1709925707/samples/c_auto/woman_car_srgx4k.jpg',
    //     price: 99.99,
    //     brand: 'Kashaf Fabrics',
    //     description: 'A stylish Kurta perfect for any outing.',
    //     category: 'Ready to Wear',
    //     rating: 4.0,
    //     numReviews: 110,
    //     countInStock: 40,
    //     colors: ['Black', 'Beige', 'Pink'],
    //     sizes: ['S','M','L'],
    // },
    {
        name: 'Untich Wash and Wear',
        slug: 'untich-wash-and-wear',
        image: 'https://res.cloudinary.com/denlscvkr/image/upload/v1746457957/IMG_6328_vcxlbp.jpg', // Correct path
        price: 59.99,
        brand: 'Kashaf Fabrics',
        description: 'An elegant suit for men.',
        category: 'Men',
        rating: 3.9,
        numReviews: 85,
        countInStock: 75,
        colors: ['Black', 'Navy Blue', 'Charcoal Gray', 'Cream', 'Olive Green', 'Maroon', 'Steel Blue'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
      }
      
      
      
      
];

var createProducts = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 5]);
                return [4 /*yield*/, mongoose_1.default.connect('mongodb+srv://kumail:kumail@cluster0.wx3fa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')];
            case 1:
                _a.sent();
                return [4 /*yield*/, ProductModel_1.default.insertMany(products)];
            case 2:
                _a.sent();
                console.log('Products created:', products);
                return [3 /*break*/, 5];
            case 3:
                error_1 = _a.sent();
                console.error('Error creating products:', error_1);
                return [3 /*break*/, 5];
            case 4:
                mongoose_1.default.connection.close();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
createProducts();
