import * as Assets from '../assets';
import * as AssetUtils from '../utils/assetUtils';

export default class Preloader extends Phaser.State {
  private preloadBarSprite: Phaser.Sprite
  private preloadFrameSprite: Phaser.Sprite

  public preload(): void {
    this.preloadBarSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesArray.getName(), Assets.Atlases.AtlasesPreloadSpritesArray.Frames.PreloadBar)
    // this.preloadBarSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesHash.getName(), Assets.Atlases.AtlasesPreloadSpritesHash.Frames.PreloadBar);
    // this.preloadBarSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesXml.getName(), Assets.Atlases.AtlasesPreloadSpritesXml.Frames.PreloadBar);
    this.preloadBarSprite.anchor.setTo(0, 0.5)
    this.preloadBarSprite.x -= this.preloadBarSprite.width * 0.5

    this.preloadFrameSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesArray.getName(), Assets.Atlases.AtlasesPreloadSpritesArray.Frames.PreloadFrame)
    // this.preloadFrameSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesHash.getName(), Assets.Atlases.AtlasesPreloadSpritesHash.Frames.PreloadFrame);
    // this.preloadFrameSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesXml.getName(), Assets.Atlases.AtlasesPreloadSpritesXml.Frames.PreloadFrame);

    this.preloadFrameSprite.anchor.setTo(0.5)

    this.game.load.setPreloadSprite(this.preloadBarSprite)

    this.game.load.shader('boxShader', Assets.Shaders.ShadersBox.getFRAG())
    this.game.load.shader('skyShader', Assets.Shaders.ShadersSky.getFRAG())
    const planetShader = this.game.load.shader('planetShader', Assets.Shaders.ShadersPlanet.getFRAG())

    AssetUtils.Loader.loadAllAssets(this.game, this.waitForSoundDecoding, this)

    this.physics.startSystem(Phaser.Physics.ARCADE)
  }

  private waitForSoundDecoding(): void {
    AssetUtils.Loader.waitForSoundDecoding(this.startGame, this)
  }

  private startGame(): void {
    this.game.camera.onFadeComplete.addOnce(this.loadTitle, this)
    this.game.camera.fade(0x000000, 1000)
  }

  private loadTitle(): void {
    this.game.state.start('space')
  }

  public update() {
  }
}
