const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const json2csv = require("json2csv").Parser;

const site = "https://prefeitura.pbh.gov.br/saude/licitacao/pregao-eletronico-151-2020";

(async () => {
    let Tenderdata = []
    const response = await Request({
        uri: site,
        headers: {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-IN,en;q=0.9,en-US;q=0.8,ml;q=0.7"
        },
        gzip: true

    })
    let $ = cheerio.load(response);

    let PublicationDate = $('#block-views-block-view-noticia-pbh-block-5 > div > div > div > div > div > div.views-field.views-field-nothing > span > span:nth-child(1)');
    let BiddingDate = $('#block-views-block-view-noticia-pbh-block-5 > div > div > div > div > div > div.views-field.views-field-nothing > span > span:nth-child(19)');
    let Object = $('#block-views-block-view-noticia-pbh-block-5 > div > div > div > div > div > div.views-field.views-field-nothing > span > p:nth-child(6) > font > font');
    let Object = $('#block-views-block-view-noticia-pbh-block-5 > div > div > div > div > div > div.views-field.views-field-field-historico-da-licitacao > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > div > div > div > a');
    Tenderdata.push({
        PublicationDate, BiddingDate, Object, link
    })

    const j2cp = new json2csv()
    const csv = j2cp.parse(Tenderdata)
    fs.writeFileSync("./file.csv", csv, "utf-8")






})();