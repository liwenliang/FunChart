/* eslint-disable */

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  globals: {
    // 全局变量的写法，防止eslint对出现在页面中未定义全局变量无脑报错，比如在代码中有一个全局变量API
    // API: true
  },
  extends: ['plugin:vue/recommended', 'standard'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module'
  },
  // 自定义规则，当与基础规则发生冲突时，覆盖基础规则
  // "off" 或 0 - 关闭规则;
  // "warn" 或 1 - 开启规则，使用警告级别的错误;
  // "error" 或 2 - 开启规则，使用错误级别的错误
  rules: {
    // 每行最大属性个数，如果是多行，每行最多一个属性
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 10,
        multiline: {
          max: 1
        }
      }
    ],
    // 忽略html标签自闭合 vue中html自终止标签是否写‘/’
    'vue/html-self-closing': 'off',
    // 单行html元素内容在新的一行
    'vue/singleline-html-element-content-newline': 'off',
    // 多行html元素内容在新的一行
    'vue/multiline-html-element-content-newline': 'off',
    // 关闭v-html的校验，因为我们可能会用到富文本编辑器
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/component-definition-name-casing': 'off',
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always'
      }
    ],
    // 一行内容最长有多少字符
    'max-len': ['error', { code: 200 }],
    // 函数名称或function关键字与开始参数之间允许有空格:关 默认为开 与prettier冲突
    'space-before-function-paren': ['error', 'never'],
    // 语句末尾不允许有';'：开
    semi: ['error', 'never'],
    // 不允许使用var
    'no-var': 2,
    // 是否允许promise中 reject()内无内容
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }]
    // 不允许对象嵌套对象的大括号之间有空格 例如：{ query: { id: row.id }[这里]}
    // 某些框架下会使用下边的配置，比如elementUI-admin
    // 'object-curly-spacing': [
    //   2,
    //   'always',
    //   {
    //     objectsInObjects: false
    //   }
    // ]
  }
}
