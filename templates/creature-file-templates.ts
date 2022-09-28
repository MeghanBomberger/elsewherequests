import { Base } from "./helpers/types";

interface VariantGroup {
  code: string;
  states: string[];
}

interface XYZ {
  x: number;
  y: number;
  z: number;
}

interface ShapeByType {
  [key: string]: Base;
}

interface TexturesByType {
  [key: string]: {
    skin: Base;
  }
}

interface CreativeInventory {
  general: string[];
  items: string[];
  creatures: string[];
}

interface GUITransformByType {
  [key: string]: {
    rotate: boolean;
    rotation: XYZ;
    origin: XYZ;
  }
}

interface TPHandTransformByType {
  [key: string]: {
    translation: XYZ;
    rotation: XYZ;
    origin: XYZ;
    scale: number;
  }
}

interface FPHandTransformByType {
  [key: string]: {
    translation: XYZ;
    rotation: XYZ;
  }
}

interface CreatureFile {
  code: string;
  class: string;
  maxstacksize: number;
  variantgroups: VariantGroup[];
  shapeByType: ShapeByType;
  texturesByType: TexturesByType;
  creativeinventory: CreativeInventory;
  materialDensity: number;
  guiTransformByType: GUITransformByType;
  tpHandTransformByType: TPHandTransformByType;
  fpHandTransformByType: FPHandTransformByType;
}

const defaultCreatureItemContentsTemplate: CreatureFile = {
  code: "creature",
  class: "ItemCreature",
  maxstacksize: 64,
  variantgroups: [
    {
      code: "type",
      states: []
    }
  ],
  shapeByType: {},
  texturesByType: {},
  creativeinventory: {
    general: ["*"],
    items: ["*"],
    creatures: ["*"]
  },
  materialDensity: 600,
  guiTransformByType: {},
  tpHandTransformByType: {},
  fpHandTransformByType: {}
}

const generateShapeByType = async (questGiverIds: string[]) => {
  const shapeByType: ShapeByType = {}
  await questGiverIds.forEach(id => shapeByType[`*-${id}`] = {
    base: "game:entity/humanoid/trader"
  })
  return shapeByType
}

const generateTexturesByType = async (questGiverIds: string[]) => {
  const texturesByType: TexturesByType = {}
  await questGiverIds.forEach(id => texturesByType[`*-${id}`] = {
    skin: {
      base: "game:entity/humanoid/trader"
    }
  })
  return texturesByType
}

const generateGUITransformByType = async (questGiverIds: string[]) => {
  const guiTransformByType: GUITransformByType = {}
  await questGiverIds.forEach(id => guiTransformByType[`*-${id}`] = {
    rotate: true,
    rotation: {
      x: 0,
      y: -90,
      z: -178
    },
    origin: {
      x: 0.6,
      y: 0.78,
      z: 0.5
    }
  })
  return guiTransformByType
}

const generateTPHandTransformByType = async (questGiverIds: string[]) => {
  const tpHandTransformByType: TPHandTransformByType = {}
  await questGiverIds.forEach(id => tpHandTransformByType[`*-${id}`] = {
    translation: {
      x: -0.6,
      y: -1.1,
      z: -0.4
    },
    rotation: {
      x: -85,
      y: -11,
      z: 89
    },
    origin: {
      x: 0.5,
      y: 1,
      z: 0.5
    },
    scale: 0.7
  })
  return tpHandTransformByType
}

const generateFPHandTransformByType = async (questGiverIds: string[]) => {
  const fpHandTransformByType: FPHandTransformByType = {}
  await questGiverIds.forEach(id => fpHandTransformByType[`*-${id}`] = {
    translation: {
      x: 0.05,
      y: -0.3,
      z: 0
    },
    rotation: {
      x: 165,
      y: 76,
      z: -180
    }
  })
  return fpHandTransformByType
}

export const generateCreatureFileContents = async (questGiverIds: string[]) => {
  const contents = {...defaultCreatureItemContentsTemplate}
  
  const shapeByType = await generateShapeByType(questGiverIds)
  const texturesByType = await generateTexturesByType(questGiverIds)
  const guiTransformByType = await generateGUITransformByType(questGiverIds)
  const tpHandTransformByType = await generateTPHandTransformByType(questGiverIds)
  const fpHandTransformByType = await generateFPHandTransformByType(questGiverIds)

  contents.variantgroups[0].states = [...questGiverIds]
  contents.shapeByType = shapeByType
  contents.texturesByType = texturesByType
  contents.guiTransformByType = guiTransformByType
  contents.tpHandTransformByType = tpHandTransformByType
  contents.fpHandTransformByType = fpHandTransformByType

  return JSON.stringify(contents)
}