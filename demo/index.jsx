
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from 'bee-button';
import './demo.scss';
const pkg = require('../package.json')




const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


import Demo1 from "./demolist/Demo1";import Demo2 from "./demolist/Demo2";
var DemoArray = [{"example":<Demo1 />,"title":" 二维码组件","code":"/**\n *\n * @title 二维码组件\n * @description 可以生成符合行业规格的二维码，支持不同格式\n *\n */\n\nimport React, { Component } from 'react';\nimport { FormControl } from 'tinper-bee';\nimport AcQrcode from '../../src/index';\nclass Demo1 extends Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n\n        }\n    }\n\n    render() {\n        return (\n            <div className=\"demoPadding\">\n                <AcQrcode\n                    value={\"http://tinper.org/\"}\n                    size={128}\n                    bgColor={\"#ffffff\"}\n                    fgColor={\"#000000\"}\n                    level={\"L\"}\n                    includeMargin={false}\n                    renderAs={\"svg\"}\n                />\n            </div>\n        )\n    }\n}\n\n\n","desc":" 可以生成符合行业规格的二维码，支持不同格式"},{"example":<Demo2 />,"title":" 二维码组件","code":"/**\n *\n * @title 二维码组件\n * @description 设置不同的二维码参数，显示不同规格的格式等\n *\n */\n\nimport React, { Component } from 'react';\nimport { FormControl, Col, Row, Select, InputNumber, Checkbox } from 'tinper-bee';\nimport AcQrcode from '../../src/index';\nclass Demo2 extends Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n            value: \"http://tinper.org/\",\n            size: 128,\n            bgColor: \"#FFFFFF\",\n            fgColor: \"#000000\",\n            level: \"L\",\n            includeMargin: false,\n            renderAs: \"svg\"\n        }\n    }\n\n    handlerChange = (key, val) => {\n        this.setState({\n            [key]: val\n        });\n    }\n    handlerChangeSize = (val) => {\n        this.setState({\n            size: Number(val)\n        });\n    }\n\n    render() {\n        let { value, size, bgColor, fgColor, level, includeMargin, renderAs } = this.state;\n        return (\n            <div className=\"demoPadding\">\n                <AcQrcode\n                    value={value}\n                    size={size}\n                    bgColor={bgColor}\n                    fgColor={fgColor}\n                    level={level}\n                    includeMargin={includeMargin}\n                    renderAs={renderAs}\n                />\n                <Row>\n                    <Col md={3}>\n                        <label>Value:</label>\n                        <FormControl value={this.state.value} onChange={(v) => this.handlerChange('value', v)} />\n                    </Col>\n                </Row>\n                <Row>\n                    <Col md={2}>\n                        <label>Size:</label>\n                        <InputNumber\n                            iconStyle=\"one\"\n                            max={1024}\n                            min={64}\n                            step={1}\n                            value={this.state.size}\n                            onChange={(v) => this.handlerChange('size', v)}\n                        />\n                    </Col>\n                </Row>\n                <Row>\n                    <Col md={2}>\n                        <label>Background Color:</label>\n                        <Select\n                            defaultValue=\"#FFFFFF\"\n                            onChange={(v) => this.handlerChange('bgColor', v)}\n                        >\n                            <Option value=\"#FFFFFF\">White</Option>\n                            <Option value=\"#fa8c16\">Yellow</Option>\n                            <Option value=\"#f5222d\">Red</Option>\n                            <Option value=\"#52c41a\">Green</Option>\n                            <Option value=\"#1890ff\">Blue</Option>\n                            <Option value=\"#13c2c2\">Cyan</Option>\n                            <Option value=\"#eb2f96\">Magenta</Option>\n                            <Option value=\"#fa541c\">Volcano</Option>\n\n                        </Select>\n                    </Col>\n                </Row>\n                <Row>\n                    <Col md={2}>\n                        <label>Foreground Color:</label>\n                        <Select\n                            defaultValue=\"#000000\"\n                            onChange={(v) => this.handlerChange('fgColor', v)}\n                        >\n                            <Option value=\"#000000\">Black</Option>\n                            <Option value=\"#fa8c16\">Yellow</Option>\n                            <Option value=\"#f5222d\">Red</Option>\n                            <Option value=\"#52c41a\">Green</Option>\n                            <Option value=\"#1890ff\">Blue</Option>\n                            <Option value=\"#13c2c2\">Cyan</Option>\n                            <Option value=\"#eb2f96\">Magenta</Option>\n                            <Option value=\"#fa541c\">Volcano</Option>\n                        </Select>\n                    </Col>\n                </Row>\n                <Row>\n                    <Col md={2}>\n                        <label>Error Level:</label>\n                        <Select\n                            defaultValue=\"L\"\n                            onChange={(v) => this.handlerChange('level', v)}\n                        >\n                            <Option value=\"L\">L</Option>\n                            <Option value=\"M\">M</Option>\n                            <Option value=\"Q\">Q</Option>\n                            <Option value=\"H\">H</Option>\n                        </Select>\n                    </Col>\n                </Row>\n                <Row>\n                    <Col md={2}>\n                        <label>Include Margin:</label>\n                        <Checkbox\n                            checked={this.state.includeMargin}\n                            onChange={this.onChange}\n                            onChange={(v) => this.handlerChange('includeMargin', v)}\n                        />\n                    </Col>\n                </Row>\n                <Row>\n                    <Col md={2}>\n                        <label>Render As:</label>\n                        <Select\n                            defaultValue=\"svg\"\n                            onChange={(v) => this.handlerChange('renderAs', v)}\n                        >\n                            <Option value=\"svg\">Svg</Option>\n                            <Option value=\"canvas\">Canvas</Option>\n                        </Select>\n                    </Col>\n                </Row>\n            </div>\n        )\n    }\n}\n\n\n","desc":" 设置不同的二维码参数，显示不同规格的格式等"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ open: !this.state.open })
    }

    render () {
        const { title, example, code, desc  } = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const footer = (
            <Button shape="block" onClick={ this.handleClick }>
                { caret }
                { text }
            </Button>
        );
        return (
            <Col md={12} >
                <h3>{ title }</h3>
                <p>{ desc }</p>
                <Panel collapsible expanded={ this.state.open } colors='bordered' header={ example } footer={footer} footerStyle = {{padding: 0}}>
                    <pre><code className="hljs javascript">{ process.env.NODE_ENV==='development'?code:code.replace('../../src/index.js',pkg.name).replace('../../src/index',pkg.name) }</code></pre>
                </Panel>
            </Col>
        )
    }
}

export default class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
                <Row>
                    {DemoArray.map((child,index) => {

                        return (
                            <Demo example= {child.example} title= {child.title} code= {child.code} desc= {child.desc} key= {index}/>
                        )

                    })}
                </Row>
        )
    }
}

