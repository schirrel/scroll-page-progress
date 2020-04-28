
(function() {

  
    const BODY = document.documentElement || document.body;
    const COLORS = {progress: '#5acdfa', complete: '#f5a8b8 ' };
    const PROP_MAP = {progress: '--spg-progress-color', complete: '--spg-complete-color' };
    const html = `
    <style>        
    :root {
      --spg-progress-color: #5acdfa;
      --spg-complete-color: #f5a8b8;
      
    }

    div[page-scroll-progress] {
      --spg-progress-color: #5acdfa;
      --spg-complete-color: #f5a8b8;
      position: fixed;
      height: 2px;
      background: var(--spg-progress-color);
      box-shadow: -1px 1px 2px var(--spg-progress-color);
      margin: 0px;
      padding: 0px;
      top: 0;
      transition: background 1000ms ease, box-shadow 500ms ease, width 200ms ease;
    }
    div[page-scroll-progress].complete {
        background: var(--spg-complete-color);
        box-shadow: -1px 1px 2px var(--spg-complete-color);
    }
    
    </style>
    <div page-scroll-progress></div>
    `;
    /**
     * Cloning contents from a &lt;template&gt; element is more performant
     * than using innerHTML because it avoids addtional HTML parse costs.
     */
    const template = document.createElement('template');
    template.innerHTML = html;

  
    class ScrollPageProgress extends HTMLElement {
      static get observedAttributes() {
        return ['progress', 'complete'];
      }
  
      constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      }
  
      connectedCallback() {

        this._upgradeProperty('progress', COLORS.progress);
        this._upgradeProperty('complete', COLORS.complete);

        window.addEventListener('scroll', ()=>{
            this._updateProgress();
        });
        this._element = null;
      }
  
      _updateProgress() {
        this._element = this._element || this.shadowRoot.querySelector('[page-scroll-progress]');
        this._element.className = this._progress() == 100 ? "complete" : "";
        this._element.style.width = `${this._progress()}%`;
      }
      
      _upgradeProperty(prop, value) {
       COLORS[prop]= value;
       this._element = this._element || this.shadowRoot.querySelector('[page-scroll-progress]');
       this._element.style.setProperty(PROP_MAP[prop], value);
      }
  
      _progress() {
        return Number(
            (BODY.scrollTop /
              (BODY.scrollHeight - BODY.clientHeight)) *
              100
          ).toFixed(2);
      }
  
      attributeChangedCallback(name, oldValue, newValue) {
          this._upgradeProperty(name, newValue)
      }
    }
  
    window.customElements.define('scroll-page-progress', ScrollPageProgress);
  })();