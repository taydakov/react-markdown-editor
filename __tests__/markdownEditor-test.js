// __tests__/MarkdownEditor-test.js

jest.dontMock('../src/MarkdownEditor.js');
jest.dontMock('../src/mixins/ButtonManagerMixin.js');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var MarkdownEditor = require('../src/MarkdownEditor.js');
var MarkdownEditorActions = require('../src/actions/MarkdownEditorActions.js');
var PublicMarkdownEditorActions = require('../src/actions/PublicMarkdownEditorActions.js');


afterEach(function() {
    MarkdownEditorActions.clickPreviewTab.mockClear();
    MarkdownEditorActions.clickEditorTab.mockClear();
});

describe('creates markdown editor', function() {
    it('creates markdown editor element composed of two divs', function() {
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);

        expect(ReactDOM.findDOMNode(editor).children.length).toEqual(2);
    });

    it('markdown editor header is composed of two divs in edit mode', function() {
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);

        var menuElements = TestUtils.scryRenderedDOMComponentsWithClass(editor, 'md-editor-header');

        expect(menuElements.length).toEqual(1);
        var children = menuElements[0].props.children;
        expect(children.length).toEqual(2);
        expect(children[0].type.displayName).toEqual('MarkdownEditorMenu');
        expect(children[1].type.displayName).toEqual('MarkdownEditorTabs');
    });

    it('markdown editor menu has 7 buttons', function() {
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);

        var editorMenu = TestUtils.findRenderedDOMComponentWithClass(editor, 'md-editor-menu');
        expect(editorMenu.props.children.length).toEqual(7);
    });

    it('markdown editor tabs element has 2 tabs', function() {
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);

        var editorTabs = TestUtils.findRenderedDOMComponentWithClass(editor, 'md-editor-tabs');
        var tabsElement = editorTabs.props.children;
        expect(tabsElement.length).toEqual(2);
        expect(tabsElement[0].type).toEqual('div');
        expect(tabsElement[0].props.children.type).toEqual('span');
        expect(tabsElement[1].type).toEqual('div');
        expect(tabsElement[1].props.children.type).toEqual('span');
    });

    it('markdown editor content is edit mode by default and displays a text area', function() {
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var secondChild = ReactDOM.findDOMNode(editor).children[1];

        expect(secondChild.type).toEqual('textarea');
    });

    it('markdown editor content displays initial content on creation', function() {
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var editorTextArea = TestUtils.findRenderedDOMComponentWithTag(editor, 'textarea');
        expect(ReactDOM.findDOMNode(editorTextArea).value).toEqual('initialContent');
    });
});

describe('toggle preview mode', function() {
    it('clicking on preview tab changes mode', function() {
        //given
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var previewTab = TestUtils.scryRenderedDOMComponentsWithClass(editor, 'md-editor-tabs-item')[1];
        var previewTabNode = ReactDOM.findDOMNode(previewTab)
        // when
        TestUtils.Simulate.click(previewTabNode);

        // then
        expect(MarkdownEditorActions.clickPreviewTab).toBeCalled();
    });

    it('clicking on editor tab changes mode', function() {
        //given
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var editorTab = TestUtils.scryRenderedDOMComponentsWithClass(editor, 'md-editor-tabs-item')[0];
        var editorTabNode = ReactDOM.findDOMNode(editorTab);
        // when
        TestUtils.Simulate.click(editorTabNode);

        // then
        expect(MarkdownEditorActions.clickEditorTab).toBeCalled();
    });
});

describe('menu button interactions', function() {
    afterEach(function() {
        MarkdownEditorActions.makeBold.mockClear();
        MarkdownEditorActions.makeItalic.mockClear();
        MarkdownEditorActions.makeHeader.mockClear();
        MarkdownEditorActions.makeSubHeader.mockClear();
        MarkdownEditorActions.makeList.mockClear();
        MarkdownEditorActions.makeImage.mockClear();
        MarkdownEditorActions.makeLink.mockClear();
    });

    it('clicking on bold button dispatches action', function() {
        //given
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var btn = TestUtils.findRenderedDOMComponentWithClass(editor, 'bold-btn');
        var btnNode = ReactDOM.findDOMNode(btn);

        // when
        TestUtils.Simulate.click(btnNode);

        // then
        expect(MarkdownEditorActions.makeBold).toBeCalled();
    });

    it('clicking on italic button dispatches action', function() {
        //given
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var btn = TestUtils.findRenderedDOMComponentWithClass(editor, 'italic-btn');
        var btnNode = ReactDOM.findDOMNode(btn);

        // when
        TestUtils.Simulate.click(btnNode);

        // then
        expect(MarkdownEditorActions.makeItalic).toBeCalled();
    });

    it('clicking on header button dispatches action', function() {
        //given
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var btn = TestUtils.findRenderedDOMComponentWithClass(editor, 'md-editor-menu-header');
        var btnNode = ReactDOM.findDOMNode(btn);

        // when
        TestUtils.Simulate.click(btnNode);

        // then
        expect(MarkdownEditorActions.makeHeader).toBeCalled();
    });

    it('clicking on subheader button dispatches action', function() {
        //given
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var btn = TestUtils.findRenderedDOMComponentWithClass(editor, 'md-editor-menu-subheader');
        var btnNode = ReactDOM.findDOMNode(btn);

        // when
        TestUtils.Simulate.click(btnNode);

        // then
        expect(MarkdownEditorActions.makeSubHeader).toBeCalled();
    });

    it('clicking on list button dispatches action', function() {
        //given
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var btn = TestUtils.findRenderedDOMComponentWithClass(editor, 'list-btn');
        var btnNode = ReactDOM.findDOMNode(btn);

        // when
        TestUtils.Simulate.click(btnNode);

        // then
        expect(MarkdownEditorActions.makeList).toBeCalled();
    });

    it('clicking on image button dispatches action', function() {
        //given
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var btn = TestUtils.findRenderedDOMComponentWithClass(editor, 'insert-img-btn');
        var btnNode = ReactDOM.findDOMNode(btn);

        // when
        TestUtils.Simulate.click(btnNode);

        // then
        expect(MarkdownEditorActions.makeImage).toBeCalled();
    });

    it('clicking on link button dispatches action', function() {
        //given
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var btn = TestUtils.findRenderedDOMComponentWithClass(editor, 'insert-link-btn');
        var btnNode = ReactDOM.findDOMNode(btn);

        // when
        TestUtils.Simulate.click(btnNode);
        expect(MarkdownEditorActions.makeLink).toBeCalled();
    });
});

describe('textarea changes behavior', function() {
    afterEach(function() {
        PublicMarkdownEditorActions.updateText.mockClear();
    });

    it('verify typing dispatches an action', function() {
        //given
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var textarea = TestUtils.findRenderedDOMComponentWithClass(editor, 'md-editor-textarea');
        var textareaNode = ReactDOM.findDOMNode(textarea);

        // when
        TestUtils.Simulate.change(textareaNode, "markdownContent");

        // then
        expect(PublicMarkdownEditorActions.updateText).toBeCalled();
    });
});
