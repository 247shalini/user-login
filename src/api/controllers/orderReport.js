import ordered from "../models/ordered.js";
import ExcelJs from "exceljs";
import fastcsv from "fast-csv";
import fs from "fs-extra";

/** 
 * In excelsheet show ordered product list 
 * @param { req, res }
 * @returns JsonResponse
 */
export const excelSheet = async (req, res) => {
    try {
        const users = await ordered.find();
        const workbook = new ExcelJs.Workbook();
        const worksheet = workbook.addWorksheet('order list');
        worksheet.columns = [
            { header: 'userId', key: "userId", width: 50 },
            { header: 'shippingAddress', key: "shippingAddress", width: 50 },
            { header: 'billingAddress', key: "billingAddress", width: 50 },
            { header: 'purchaseItems', key: "purchaseItems", width: 100 },
        ];

        users.forEach(user => {
            worksheet.addRow(user);
        });

        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });

        const data = await workbook.xlsx.writeFile('order-list.xlsx')

        res.send('order list send successfully !!');

    } catch (e) {
        res.status(500).send(e)
    }
}

/** 
 * In pdf file show ordered product list 
 * @param { req, res }
 * @returns JsonResponse
 */
export const pdfFile = async (req, res) => {
    try {
        const orderList = await ordered.find();
        const ws = fs.createWriteStream("data.csv")
        fastcsv
            .write( [ orderList ], { headers: true } )
            .on("finish", function () {
                res.send("PDF file exported !!")
            })
            .pipe(ws);
    } catch (e) {
        res.status(500).send(e)
    }
}