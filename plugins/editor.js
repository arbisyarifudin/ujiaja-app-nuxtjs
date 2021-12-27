import Vue from 'vue'
import Vue2Editor from 'vue2-editor'
import ImageResize from "quill-image-resize-module";
import '@/assets/mathjax/tex-mml-svg.js'

// Import parchment and delta for creating custom module
const Parchment = Quill.imports.parchment;
const Delta = Quill.imports.delta;

// Extend the embed
class Mathjax extends Parchment.Embed {

    // Create node
    static create(value) 
    {
        const node = super.create(value);    
        if (typeof value === 'string') {
            node.innerHTML = "&#65279;" + this.tex2svg(value) + "&#65279;";
            node.contentEditable = 'false';
            node.setAttribute('data-value', value);         
        }
        return node;
    }

    // Return the attribute value (probably for Delta)
    static value(domNode) 
    {
        return domNode.getAttribute('data-value');
    }

    // Manually render a MathJax equation until version 3.0.2 is not released
    static tex2svg(latex)
    {
        // Create a hidden node and render the formula inside
        let MathJaxNode = document.createElement("DIV");
        MathJaxNode.style.visibility = "hidden";
        MathJaxNode.innerHTML = '\\(' + latex + '\\)';
        document.body.appendChild(MathJaxNode);
        MathJax.typeset();
        let svg = MathJaxNode.innerHTML;
        document.body.removeChild(MathJaxNode);
        return svg;
    }
    
    // html() {
    //     const { mathjax } = this.value();
    //     return `<span>${mathjax}</span>`;
    // }
     
}

// Set module properties
Mathjax.blotName = 'mathjax';
Mathjax.className = 'ql-mathjax';
Mathjax.tagName = 'SPAN';

// Register the module
Quill.register(Mathjax);

Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/mathjax", Mathjax);

Vue.use(Vue2Editor)