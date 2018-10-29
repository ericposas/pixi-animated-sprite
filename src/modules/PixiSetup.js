import pixijs from 'pixi.js';
import $ from 'jquery';

export var app = new PIXI.Application({width:innerHeight, height:innerWidth});
export var stage = app.stage;
export var renderer = app.renderer;
export var loader = PIXI.loader;
export var resources = PIXI.loader.resources;

export const Texture = PIXI.Texture;
export const TextureCache = PIXI.utils.TextureCache;
export const Rectangle = PIXI.Rectangle;
export const Sprite = PIXI.Sprite;

export function PixiSetup(){
  
  $('head').append(`<style>*{padding:0;margin:0;}</style>`);
  
  let type = 'WebGL';
  if(!PIXI.utils.isWebGLSupported()){
    type = 'canvas';
  }
  PIXI.utils.sayHello(type);
  
  document.body.appendChild(app.view);
  app.renderer.backgroundColor = '0x000000';
  app.renderer.autoResize = true;
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';
}

export function PixiResize(){
  console.log('resizes the pixi renderer according to the window dimensions');
  renderer.resize(innerWidth, innerHeight);
  /*renderer.resize(
    $('#app-view').width(),
    $('#app-view').height()
  );*/
}
