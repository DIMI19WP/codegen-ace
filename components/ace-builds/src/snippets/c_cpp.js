ace.define('ace/snippets/c_cpp', ['require', 'exports', 'module'], function(
    e,
    t,
    n
) {
    'use strict'
    ;(t.snippetText =
        '# for i \nsnippet fori\n	for (int ${2:i} = 0; $2 < ${1:count}; $2${3:++}) {\n		${4:/* code */}\n	}${5}\n# printf\nsnippet printf\n	printf("${1:content}"${2:?additional});\n# scanf\nsnippet scanf\n	scanf("%${1:type}", &${2:variable});\n\n# if\nsnippet if\n	if(${1:condition}) {\n		${2:body}\n	}\n\nsnippet intmain\n	int main() {\n		return;\n	}'),
        (t.scope = 'c_cpp')
})
;(function() {
    ace.require(['ace/snippets/c_cpp'], function(m) {
        if (typeof module == 'object' && typeof exports == 'object' && module) {
            module.exports = m
        }
    })
})()
