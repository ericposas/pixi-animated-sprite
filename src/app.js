import $ from 'jquery';
import * as PIXI from 'pixi.js';
import {PixiSetup,PixiResize} from './modules/PixiSetup.js';
import {app,stage,renderer,loader,resources} from './modules/PixiSetup.js';

//import './images/Ryu_Animation.json';
//import './images/Ryu_Animation.png';
//import './images/Hadoken.json';
//import './images/Hadoken.png';

import './images/TextureAtlas.json';
import './images/TextureAtlas.png';


PixiSetup();


loader
  .add('./images/TextureAtlas.json')
  //.add('./images/Ryu_Animation.json')
  //.add('./images/Hadoken.json')
  .on('progress', on_load_progress)
  .load(setup);

function on_load_progress(data){
  console.log('load progress: ', data.progress+'%');
}

function setup(){
  let frames = [];
  for(let i = 10; i < 17; i++)
    frames.push(PIXI.Texture.fromFrame(i));
  let anim = new PIXI.extras.AnimatedSprite(frames);
  //stage.addChild(anim);
  anim.animationSpeed = .1;
  anim.play();
  anim.interactive = true;
  anim.buttonMode = true;
  
  let hado_frames = [];
  for(let i = 0; i < 10; i++)
    hado_frames.push(PIXI.Texture.fromFrame(i));
  let hado = new PIXI.extras.AnimatedSprite(hado_frames);
  hado.animationSpeed = .15;
  //stage.addChild(hado);
  hado.visible = false;
  hado.loop = false;
  hado.onComplete = function(){
    anim.visible = true;
    hado.visible = false;
    hado.gotoAndStop(0);
    hado.x = 0;
  }
  console.log(hado);
  hado.onFrameChange = () => {
    let _current_frame = hado._texture.textureCacheIds[0];
    if( _current_frame == 5 ){
      hado.x = 5;
    }
    if( _current_frame == 6 ){
      hado.x = -10;
    }
    console.log( _current_frame );
  }
  
  anim.on('pointerdown', ()=>{
    anim.visible = false;
    hado.visible = true;
    hado.play();
  });
  
  let ryu = new PIXI.Container();
  ryu.addChild(anim);
  ryu.addChild(hado);
  stage.addChild(ryu);
  ryu.position.set(25, 25);
  
}

function current_frame(sprite){
  return sprite._texture.textureCacheIds[0];
}


$(window).resize(PixiResize);
$(window).trigger('resize');
