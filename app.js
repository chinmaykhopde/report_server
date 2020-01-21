const exp = require('express');
const app = exp();
const fs = require('fs');

app.use(exp.static("public"));
app.use(exp.json());       // to support JSON-encoded bodies
app.use(exp.urlencoded({extended: true}));

const PORT = 8000;
const REPORT_FILE_PATH = __dirname + '/report_files/'
const MONTHLY_ROOT = __dirname + '/report_files/'

app.get('/', (req, res) => {
	res.redirect('./index.html');
})

app.post('/getMonthly', (req, res) => {
	if (req.body.report_month) {
		get_all_reports().then( (result) => {
			for (let i = 0; i < result.length; i++) {
				if (result[i].search(req.body.report_month) !== -1) {
					var extention = (result[i].split('.'));
					var MIME_Type;
					if (extention[1] === 'txt') {
						MIME_Type = 'text/plain';
					}
					if (extention[1] === 'pdf') {
						MIME_Type = 'application/pdf';
					}
					if (extention[1] === 'xls') {
						// MIME_Type = 'application/vnd.ms-excel';
						res.redirect('http://view.officeapps.live.com/op/view.aspx?src=' + result[i].slice(1, -1));
						break;
					}
					if (extention[1] === 'xlsx') {
						// MIME_Type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
						console.log('http://view.officeapps.live.com/op/view.aspx?src=.\\report_files\\' + result[i]);
						res.redirect('http://view.officeapps.live.com/op/view.aspx?src.\\report_files\\' + result[i]);
						break;
					}
					res.set('Content-disposition', 'inline; filename="' + result[i] + '"');
					res.set('Content-type', MIME_Type);
					res.sendFile(REPORT_FILE_PATH + result[i]);
					break;
				}
			}
		}, (error) => {
			console.error(error);
		});
	}
	else {
		res.send("No Month Selected");
	}
});

app.post('/getDaily', (req, res) => {
	if (req.body.report_date) {
		get_all_reports().then( (result) => {
			for (let i = 0; i < result.length; i++) {
				if (result[i].search(req.body.report_date) !== -1) {
					var extention = (result[i].split('.'));
					var MIME_Type;
					if (extention[1] === 'txt') {
						MIME_Type = 'text/plain';
					}
					if (extention[1] === 'pdf') {
						MIME_Type = 'application/pdf';
					}
					if (extention[1] === 'xls') {
						// MIME_Type = 'application/vnd.ms-excel';
						res.redirect('http://view.officeapps.live.com/op/view.aspx?src=' + result[i].slice(1, -1));
						break;
					}
					if (extention[1] === 'xlsx') {
						// MIME_Type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
						console.log('http://view.officeapps.live.com/op/view.aspx?src=.\\report_files\\' + result[i]);
						res.redirect('http://view.officeapps.live.com/op/view.aspx?src.\\report_files\\' + result[i]);
						break;
					}
					res.set('Content-disposition', 'inline; filename="' + result[i] + '"');
					res.set('Content-type', MIME_Type);
					res.sendFile(REPORT_FILE_PATH + result[i]);
					break;
				}
			}
		}, (error) => {
			console.error(error);
		});
	}
	else {
		res.send("No Month Selected");
	}
});


app.get('/tmp', (req, res) => {
    if (req.query.listAll) {
        get_all_reports().then( (result) => {
            result[0][result[0].search('.pdf')];
            res.send(result);
        }, (error) => {
            console.error(error);
        });
    }
    else if (req.query.serach_query) {
        let tmp = find_file(req.query.serach_query); 
        
        tmp.then( (result) => {
            result[0][result[0].search('')];
            res.send(result);
        }, (error) => {
            console.error(error);
        });
    }
    else if (req.query.exactDoc) {
        res.download(REPORT_FILE_PATH + req.query.exactDoc);
    }
    else {
        
    }
});

app.listen(PORT, () => {
    console.log('Started on port 8000');
});

var get_all_reports = async () => {
    const dir = await fs.promises.opendir(REPORT_FILE_PATH);
    var list_of_files = [];
    for await (const dirent of dir) {
      list_of_files.push(dirent.name);
    }
    return list_of_files;
};