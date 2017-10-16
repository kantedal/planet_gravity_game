/* AUTO GENERATED FILE. DO NOT MODIFY. YOU WILL LOSE YOUR CHANGES ON BUILD. */

export namespace Images {
    export class ImagesArrow {
        static getName(): string { return 'arrow' }

        static getPNG(): string { return require('assets/images/arrow.png') }
    }
    export class ImagesBackgroundTemplate {
        static getName(): string { return 'background_template' }

        static getPNG(): string { return require('assets/images/background_template.png') }
    }
    export class ImagesCrosshair {
        static getName(): string { return 'crosshair' }

        static getPNG(): string { return require('assets/images/crosshair.png') }
    }
    export class ImagesFire1 {
        static getName(): string { return 'fire1' }

        static getPNG(): string { return require('assets/images/fire1.png') }
    }
    export class ImagesFueltank {
        static getName(): string { return 'fueltank' }

        static getPNG(): string { return require('assets/images/fueltank.png') }
    }
    export class ImagesSpaceShuttleBlack {
        static getName(): string { return 'space_shuttle_black' }

        static getPNG(): string { return require('assets/images/space_shuttle_black.png') }
    }
    export class ImagesSpaceShuttle {
        static getName(): string { return 'space_shuttle' }

        static getPNG(): string { return require('assets/images/space_shuttle.png') }
    }
    export class ImagesSquareTest {
        static getName(): string { return 'squareTest' }

        static getPNG(): string { return require('assets/images/squareTest.png') }
    }
    export class ImagesTest {
        static getName(): string { return 'test' }

        static getPNG(): string { return require('assets/images/test.png') }
    }
    export class ImagesWizball {
        static getName(): string { return 'wizball' }

        static getPNG(): string { return require('assets/images/wizball.png') }
    }
}

export namespace Spritesheets {
    class IExistSoTypeScriptWillNotComplainAboutAnEmptyNamespace {}
}

export namespace Atlases {
    enum AtlasesPreloadSpritesArrayFrames {
        PreloadBar = <any>'preload_bar.png',
        PreloadFrame = <any>'preload_frame.png',
    }
    export class AtlasesPreloadSpritesArray {
        static getName(): string { return 'preload_sprites_array' }

        static getJSONArray(): string { return require('assets/atlases/preload_sprites_array.json') }

        static getPNG(): string { return require('assets/atlases/preload_sprites_array.png') }

        static Frames = AtlasesPreloadSpritesArrayFrames;
    }
    enum AtlasesPreloadSpritesHashFrames {
        PreloadBar = <any>'preload_bar.png',
        PreloadFrame = <any>'preload_frame.png',
    }
    export class AtlasesPreloadSpritesHash {
        static getName(): string { return 'preload_sprites_hash' }

        static getJSONHash(): string { return require('assets/atlases/preload_sprites_hash.json') }

        static getPNG(): string { return require('assets/atlases/preload_sprites_hash.png') }

        static Frames = AtlasesPreloadSpritesHashFrames;
    }
    enum AtlasesPreloadSpritesXmlFrames {
        PreloadBar = <any>'preload_bar.png',
        PreloadFrame = <any>'preload_frame.png',
    }
    export class AtlasesPreloadSpritesXml {
        static getName(): string { return 'preload_sprites_xml' }

        static getPNG(): string { return require('assets/atlases/preload_sprites_xml.png') }

        static getXML(): string { return require('assets/atlases/preload_sprites_xml.xml') }

        static Frames = AtlasesPreloadSpritesXmlFrames;
    }
}

export namespace Audio {
    export class AudioMusic {
        static getName(): string { return 'music' }

        static getAC3(): string { return require('assets/audio/music.ac3'); }
        static getM4A(): string { return require('assets/audio/music.m4a'); }
        static getMP3(): string { return require('assets/audio/music.mp3'); }
        static getOGG(): string { return require('assets/audio/music.ogg'); }
    }
}

export namespace Audiosprites {
    enum AudiospritesSfxSprites {
        Laser1 = <any>'laser1',
        Laser2 = <any>'laser2',
        Laser3 = <any>'laser3',
        Laser4 = <any>'laser4',
        Laser5 = <any>'laser5',
        Laser6 = <any>'laser6',
        Laser7 = <any>'laser7',
        Laser8 = <any>'laser8',
        Laser9 = <any>'laser9',
    }
    export class AudiospritesSfx {
        static getName(): string { return 'sfx' }

        static getAC3(): string { return require('assets/audiosprites/sfx.ac3') }
        static getJSON(): string { return require('assets/audiosprites/sfx.json') }
        static getM4A(): string { return require('assets/audiosprites/sfx.m4a') }
        static getMP3(): string { return require('assets/audiosprites/sfx.mp3') }
        static getOGG(): string { return require('assets/audiosprites/sfx.ogg') }

        static Sprites = AudiospritesSfxSprites;
    }
}

export namespace GoogleWebFonts {
    export const Barrio: string = 'Barrio'
    export const Pixelar: string = 'Pixelar'
    export const FR73Pixel: string = 'FR73 Pixel'
    export const LibreBarcode39ExtendedText: string = 'Libre Barcode 39 Extended Text'
}

export namespace CustomWebFonts {
    export class Fonts2DumbWebfont {
        static getName(): string { return '2Dumb-webfont'; }

        static getFamily(): string { return '2dumbregular' }

        static getCSS(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/2Dumb-webfont.css') }
        static getEOT(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/2Dumb-webfont.eot') }
        static getSVG(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/2Dumb-webfont.svg') }
        static getTTF(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/2Dumb-webfont.ttf') }
        static getWOFF(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/2Dumb-webfont.woff') }
    }
}

export namespace BitmapFonts {
    export class FontsFontFnt {
        static getName(): string { return 'font_fnt' }

        static getFNT(): string { return require('assets/fonts/font_fnt.fnt') }
        static getPNG(): string { return require('assets/fonts/font_fnt.png') }
    }
    export class FontsFontXml {
        static getName(): string { return 'font_xml' }

        static getPNG(): string { return require('assets/fonts/font_xml.png') }
        static getXML(): string { return require('assets/fonts/font_xml.xml') }
    }
}

export namespace JSON {
    class IExistSoTypeScriptWillNotComplainAboutAnEmptyNamespace {}
}

export namespace XML {
    class IExistSoTypeScriptWillNotComplainAboutAnEmptyNamespace {}
}

export namespace Text {
    class IExistSoTypeScriptWillNotComplainAboutAnEmptyNamespace {}
}

export namespace Scripts {
    export class ScriptsBlurX {
        static getName(): string { return 'BlurX' }

        static getJS(): string { return require('assets/scripts/BlurX.js') }
    }
    export class ScriptsBlurY {
        static getName(): string { return 'BlurY' }

        static getJS(): string { return require('assets/scripts/BlurY.js') }
    }
}
export namespace Shaders {
    export class ShadersBox {
        static getName(): string { return 'box' }

        static getFRAG(): string { return require('assets/shaders/box.frag') }
    }
    export class ShadersPixelate {
        static getName(): string { return 'pixelate' }

        static getFRAG(): string { return require('assets/shaders/pixelate.frag') }
    }
    export class ShadersPlanet {
        static getName(): string { return 'planet' }

        static getFRAG(): string { return require('assets/shaders/planet.frag') }
    }
    export class ShadersSky {
        static getName(): string { return 'sky' }

        static getFRAG(): string { return require('assets/shaders/sky.frag') }
    }
}
export namespace Misc {
    class IExistSoTypeScriptWillNotComplainAboutAnEmptyNamespace {}
}
