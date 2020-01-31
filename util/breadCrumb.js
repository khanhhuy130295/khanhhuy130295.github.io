const _ = require('lodash');
const setUpBreadCrumb = (urlParam)=>{
    let urlComponent = urlParam.split('/');
    let result = [];
    let seqUrl = '';
    _.forEach(urlComponent, (value)=>{
        seqUrl += '/' + value;
        let obj = {
            name: value.charAt(0).toUpperCase() + value.slice(1), // letter first upcase
            url: seqUrl,
            active: false
        };
        result.push(obj);
    });
    result[result.length-1].active = true;
    return result;
}

module.exports.setUpBreadCrumb = setUpBreadCrumb;