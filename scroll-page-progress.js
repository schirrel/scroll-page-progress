class ScrollPageProgress {
  constructor() {
    this.element = document.querySelector("[page-scroll-progress]");
      this.body = document.documentElement || document.body;
      
      window.onscroll = () => {
        this.element.className = this.progress == 100 ? "complete" : "";
        this.element.style.width = `${this.progress}%`;
      };
  }
  get progress() {
    return Number(
      (this.body.scrollTop /
        (this.body.scrollHeight - this.body.clientHeight)) *
        100
    ).toFixed(2);
  }

  /*
  can be done with a trigger to start like:
  start() {
    window.onscroll = () => {
      this.element.className = this.progress == 100 ? "complete" : "";
      this.element.style.width = `${this.progress}%`;
    };
  }*/
}
