import React from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
//<img src={require("../asset/img/slide1.JPG")} className="rounded border border-secondary"  alt="slide1"/>



const items = [];

(function() {
  for (var i=1; i <= 10; i++){
      items[i-1] = {
      src: require(`../asset/img/slide${i}.JPG`),
      altText:`Slide ${i}`,
      caption:`Slide ${i}`
    }
  }
})()

export default class Slide extends React.Component {



  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);

    this.items= [];
    for (var i=1; i <= 10; i++){
        this.items[i-1] = {
        src: require(`../asset/img/slide${i}.JPG`),
        altText:`Slide ${i}`,
        caption:`${i} Page`
      }
    }
  }



  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {

    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {

    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;


    const slides = this.items.map((item) => {

      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption}  />
        </CarouselItem>
      );
    });

    return (
      <Carousel interval={false}
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={this.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}
