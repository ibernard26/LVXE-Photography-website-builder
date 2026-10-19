import type { ImageMetadata } from 'astro';

import earringPortrait from '@/assets/work/earring-portrait.jpg';
import handsPortrait from '@/assets/work/hands-portrait.jpg';
import meshPair from '@/assets/work/mesh-pair.jpg';
import recordStore from '@/assets/work/record-store.jpg';
import cathedral from '@/assets/work/cathedral.jpg';
import fingersCloseup from '@/assets/work/fingers-closeup.jpg';
import cupPortrait from '@/assets/work/cup-portrait.jpg';
import dropEarringProfile from '@/assets/work/drop-earring-profile.jpg';
import eyesClosed from '@/assets/work/eyes-closed.jpg';
import handOverBrow from '@/assets/work/hand-over-brow.jpg';
import motionProfile from '@/assets/work/motion-profile.jpg';
import furHatCloseup from '@/assets/work/fur-hat-closeup.jpg';
import halfShadow from '@/assets/work/half-shadow.jpg';
import lighter from '@/assets/work/lighter.jpg';
import yankeesCap from '@/assets/work/yankees-cap.jpg';
import framedHands from '@/assets/work/framed-hands.jpg';
import longCoat from '@/assets/work/long-coat.jpg';
import studioPair from '@/assets/work/studio-pair.jpg';
import library from '@/assets/work/library.jpg';
import whiteSkirt from '@/assets/work/white-skirt.jpg';
import parapetSit from '@/assets/work/parapet-sit.jpg';
import parapetCrouch from '@/assets/work/parapet-crouch.jpg';
import grass from '@/assets/work/grass.jpg';
import brickStoop from '@/assets/work/brick-stoop.jpg';
import checkedDress from '@/assets/work/checked-dress.jpg';
import hoodedStone from '@/assets/work/hooded-stone.jpg';
import barrierPair from '@/assets/work/barrier-pair.jpg';
import yellowJacket from '@/assets/work/yellow-jacket.jpg';
import overShoulder from '@/assets/work/over-shoulder.jpg';
import greyWall from '@/assets/work/grey-wall.jpg';
import graffitiSteps from '@/assets/work/graffiti-steps.jpg';
import skateWall from '@/assets/work/skate-wall.jpg';
import chainLink from '@/assets/work/chain-link.jpg';
import cafeBlur from '@/assets/work/cafe-blur.jpg';
import streetLeap from '@/assets/work/street-leap.jpg';
import maskHeld from '@/assets/work/mask-held.jpg';
import maskHands from '@/assets/work/mask-hands.jpg';
import maskStreet from '@/assets/work/mask-street.jpg';
import masksDark from '@/assets/work/masks-dark.jpg';
import greenF1 from '@/assets/work/green-f1.jpg';
import orangeWheel from '@/assets/work/orange-wheel.jpg';
import redSaleen from '@/assets/work/red-saleen.jpg';
import red911 from '@/assets/work/red-911.jpg';
import porscheCrest from '@/assets/work/porsche-crest.jpg';
import blueFerrari from '@/assets/work/blue-ferrari.jpg';
import manhattanBridge from '@/assets/work/manhattan-bridge.jpg';
import shadowedCorner from '@/assets/work/shadowed-corner.jpg';
import duneHouse from '@/assets/work/dune-house.jpg';
import pastelHorizon from '@/assets/work/pastel-horizon.jpg';

/**
 * A "plate" is a single authentic photograph from the LVXE archive.
 * Intrinsic dimensions come from the imported ImageMetadata, so the native
 * aspect ratio is always preserved and never redeclared by hand.
 *
 * Only observable facts are recorded (tone, orientation). Titles, series,
 * locations and dates stay empty until Isaiah supplies them.
 */
export type Plate = {
  id: string;
  image: ImageMetadata;
  alt: string;
  tone: 'Colour' | 'Monochrome';
  /**
   * Title. Written from what the frame shows (light, gesture, setting) at
   * Isaiah's request on 17 Oct 2026; any of them can be renamed. Empty
   * renders as "Untitled".
   */
  title?: string;
  /** Verified caption only. */
  caption?: string;
  /** Series slug once confirmed. */
  series?: string;
  /** Year made. Empty until Isaiah confirms it; the ledger shows a dash. */
  year?: string;
  /**
   * Chapter of the archive: the Work page's sections and the Ledger's
   * filters. Read from the frames themselves (subject and setting),
   * pending Isaiah's sign-off.
   */
  disciplines: Discipline[];
};

/**
 * Chapters, in the order the Work page hangs them. "All" is implicit in the
 * Ledger filters. A chapter with no plates is not shown anywhere.
 */
export const disciplines = ['Portraits', 'Editorial', 'Street', 'Masks', 'Automotive', 'City', 'Coast'] as const;
export type Discipline = (typeof disciplines)[number];

export const plates = {
  fingersCloseup: {
    disciplines: ['Portraits'],
    id: 'fingers-closeup',
    title: 'Aperture',
    image: fingersCloseup,
    tone: 'Colour',
    alt: "Extreme close-up in warm low light: a sitter's face framed by their own fingers, one eye looking up past a hand pressed to the brow, skin beaded with droplets.",
  },
  earringPortrait: {
    disciplines: ['Portraits'],
    id: 'earring-portrait',
    title: 'What the Window Kept',
    image: earringPortrait,
    tone: 'Colour',
    alt: 'Close portrait in low window light: a sitter with straight black hair, a square white earring and a sculpted silver necklace, looking back over one shoulder.',
  },
  handsPortrait: {
    disciplines: ['Portraits'],
    id: 'hands-portrait',
    title: 'Self, Withheld',
    image: handsPortrait,
    tone: 'Monochrome',
    alt: 'Black-and-white portrait of a sitter with long braids, hands framing the face and covering the eyes, long sculpted nails and silver rings catching the light.',
  },
  cathedral: {
    disciplines: ['Editorial'],
    id: 'cathedral',
    title: 'Sermon in Chrome',
    image: cathedral,
    tone: 'Colour',
    alt: 'Low-angle portrait of a sitter in chrome wraparound sunglasses and a dark hood beneath a gothic stone archway, one hand reaching toward the lens.',
  },
  meshPair: {
    disciplines: ['Editorial'],
    id: 'mesh-pair',
    title: 'Twin Crowns',
    image: meshPair,
    tone: 'Colour',
    alt: 'Two sitters in white crochet head coverings and braids photographed from below against a chain-link fence and pale sky.',
  },
  recordStore: {
    disciplines: ['Editorial'],
    id: 'record-store',
    title: 'Side B',
    image: recordStore,
    tone: 'Monochrome',
    alt: 'Black-and-white low-angle portrait of a sitter in a leather jacket leaning against a counter in a record shop, a wall of vinyl sleeves behind.',
  },
  cupPortrait: {
    disciplines: ['Portraits'],
    id: 'cup-portrait',
    title: 'Steeped',
    image: cupPortrait,
    tone: 'Colour',
    alt: 'Close portrait in warm light: a sitter with winged eyeliner and gold earrings looks into the lens over the rim of a white cup.',
  },
  dropEarringProfile: {
    disciplines: ['Portraits'],
    id: 'drop-earring-profile',
    title: 'Pendulum',
    image: dropEarringProfile,
    tone: 'Colour',
    alt: 'Profile against a pale wall: a sitter with slicked-back dark hair and a long drop earring looks down, a gold chain at the neck.',
  },
  eyesClosed: {
    disciplines: ['Portraits'],
    id: 'eyes-closed',
    title: 'Lullaby in Grey',
    image: eyesClosed,
    tone: 'Colour',
    alt: 'A sitter rests their face against their hands, eyes closed, a nose ring and long nails catching soft light against a grey wall.',
  },
  handOverBrow: {
    disciplines: ['Portraits'],
    id: 'hand-over-brow',
    title: 'Benediction',
    image: handOverBrow,
    tone: 'Colour',
    alt: 'A sitter tilts their head back, one hand with long decorated nails and silver rings pressed over the brow, the other at the jaw.',
  },
  motionProfile: {
    disciplines: ['Portraits'],
    id: 'motion-profile',
    title: 'Afterimage',
    image: motionProfile,
    tone: 'Monochrome',
    alt: 'Black-and-white profile of a sitter in a beaded headpiece, the far side of the frame dissolving into motion blur on a white ground.',
  },
  furHatCloseup: {
    disciplines: ['Portraits'],
    id: 'fur-hat-closeup',
    title: 'Chrome Weather',
    image: furHatCloseup,
    tone: 'Colour',
    alt: 'Tight close-up of a sitter in a black fur hat and wraparound sunglasses, a nose ring catching the light.',
  },
  halfShadow: {
    disciplines: ['Portraits'],
    id: 'half-shadow',
    title: 'Partial Eclipse',
    image: halfShadow,
    tone: 'Colour',
    alt: 'A sitter with dark curly hair looks straight at the lens, half the face falling into deep shadow.',
  },
  lighter: {
    disciplines: ['Portraits'],
    id: 'lighter',
    title: 'The Pause Before Smoke',
    image: lighter,
    tone: 'Monochrome',
    alt: 'Black-and-white portrait of a sitter with a fringe lighting a cigarette, eyes closed, rings on both hands.',
  },
  yankeesCap: {
    disciplines: ['Portraits'],
    id: 'yankees-cap',
    title: 'Low Signal',
    image: yankeesCap,
    tone: 'Colour',
    alt: 'Low-key portrait in teal shadow: a sitter in a black New York Yankees cap and narrow sunglasses looks down, a chain at the neck.',
  },
  framedHands: {
    disciplines: ['Portraits'],
    id: 'framed-hands',
    title: 'Viewfinder',
    image: framedHands,
    tone: 'Colour',
    alt: 'A blonde sitter with red lipstick frames their face with tattooed fingers against a blue sky.',
  },
  longCoat: {
    disciplines: ['Editorial'],
    id: 'long-coat',
    title: 'A Coat Like Weather',
    image: longCoat,
    tone: 'Monochrome',
    alt: 'Black-and-white full-length study of a sitter in a long dark coat and lace top against a white backdrop, head turned to one side.',
  },
  studioPair: {
    disciplines: ['Editorial'],
    id: 'studio-pair',
    title: 'Duet in Cream',
    image: studioPair,
    tone: 'Colour',
    alt: 'Two sitters crouch together on a cream studio backdrop: one in an open white shirt and black trousers, the other in a black suit.',
  },
  library: {
    disciplines: ['Editorial'],
    id: 'library',
    title: 'Marginalia',
    image: library,
    tone: 'Colour',
    alt: 'A sitter in a pinstripe jacket and glasses reads at a library table, a stack of books in the foreground and shelves behind.',
  },
  whiteSkirt: {
    disciplines: ['Editorial'],
    id: 'white-skirt',
    title: 'Cloud Study',
    image: whiteSkirt,
    tone: 'Colour',
    alt: 'Low-angle editorial of a sitter in a black fur hat, sunglasses, a black vest and a full white ruffled skirt against a blue sky.',
  },
  parapetSit: {
    disciplines: ['Editorial'],
    id: 'parapet-sit',
    title: 'Sovereign of Concrete',
    image: parapetSit,
    tone: 'Colour',
    alt: 'A sitter in a black leather jacket, sunglasses and wide dark jeans sits on a concrete parapet against a teal sky, shot from below.',
  },
  parapetCrouch: {
    disciplines: ['Editorial'],
    id: 'parapet-crouch',
    title: 'Icarus, Grounded',
    image: parapetCrouch,
    tone: 'Colour',
    alt: 'A sitter in a black leather jacket and wide jeans crouches with arms spread against a sunlit concrete wall, casting a hard shadow.',
  },
  grass: {
    disciplines: ['Editorial'],
    id: 'grass',
    title: 'Supine in Green',
    image: grass,
    tone: 'Colour',
    alt: 'A sitter with curly hair lies back in the grass, gold-rimmed sunglasses pushed up, a white shirt collar in the foreground.',
  },
  brickStoop: {
    disciplines: ['Editorial'],
    id: 'brick-stoop',
    title: 'Rust and Smoke',
    image: brickStoop,
    tone: 'Colour',
    alt: 'A sitter with copper hair, headphones around the neck and a cigarette in hand sits on a brick stoop in a black tank top and flared jeans.',
  },
  checkedDress: {
    disciplines: ['Editorial'],
    id: 'checked-dress',
    title: 'Grid Theory',
    image: checkedDress,
    tone: 'Colour',
    alt: 'Low-angle editorial of a sitter in cat-eye sunglasses and a black checked dress, one hand raised to the underside of a slatted stairway.',
  },
  hoodedStone: {
    disciplines: ['Editorial'],
    id: 'hooded-stone',
    title: 'Vespers',
    image: hoodedStone,
    tone: 'Colour',
    alt: 'A sitter in a dark hood, chrome sunglasses and dark lipstick sits against a rough stone wall in low light.',
  },
  barrierPair: {
    disciplines: ['Editorial'],
    id: 'barrier-pair',
    title: 'Concrete Pact',
    image: barrierPair,
    tone: 'Colour',
    alt: 'Two sitters with long braids at a concrete barrier under a cloudy sky: one seated on top in a cream fur jacket, the other leaning against it in wide jeans.',
  },
  yellowJacket: {
    disciplines: ['Editorial'],
    id: 'yellow-jacket',
    title: 'Chorus',
    image: yellowJacket,
    tone: 'Colour',
    alt: 'Five sitters on stone steps; in front, one in a yellow leather jacket and knit cap covers their face with a hand.',
  },
  overShoulder: {
    disciplines: ['Editorial'],
    id: 'over-shoulder',
    title: 'The Glance Back',
    image: overShoulder,
    tone: 'Colour',
    alt: 'A sitter with long brown hair and sunglasses looks back over their shoulder on a blurred city street.',
  },
  greyWall: {
    disciplines: ['Editorial'],
    id: 'grey-wall',
    title: 'Quiet Armor',
    image: greyWall,
    tone: 'Monochrome',
    alt: 'Black-and-white full-length portrait of a sitter in sunglasses and a leather jacket standing before a grey panelled wall.',
  },
  graffitiSteps: {
    disciplines: ['Street'],
    id: 'graffiti-steps',
    title: 'Palimpsest',
    image: graffitiSteps,
    tone: 'Colour',
    alt: 'Three sitters on graffiti-covered steps, one holding a skateboard, surrounded by murals.',
  },
  skateWall: {
    disciplines: ['Street'],
    id: 'skate-wall',
    title: 'Gravity, Negotiated',
    image: skateWall,
    tone: 'Monochrome',
    alt: 'Black-and-white image of a skateboarder riding up a graffiti-covered wall behind a chain-link fence.',
  },
  chainLink: {
    disciplines: ['Street'],
    id: 'chain-link',
    title: 'Holding Court',
    image: chainLink,
    tone: 'Monochrome',
    alt: 'Black-and-white portrait of a sitter in a cap and tank top, tattooed arms resting on the knees, two companions seated behind against a chain-link fence.',
  },
  cafeBlur: {
    disciplines: ['Masks'],
    id: 'cafe-blur',
    title: 'Still Life, Rush Hour',
    image: cafeBlur,
    tone: 'Colour',
    alt: 'A sitter in a white featureless mask sits still at a café table while pedestrians and a yellow taxi blur past on a city street.',
  },
  streetLeap: {
    disciplines: ['Street'],
    id: 'street-leap',
    title: 'Suspended Sentence',
    image: streetLeap,
    tone: 'Monochrome',
    alt: 'Black-and-white low-angle shot of a figure leaping mid-air above a street, overhead wires behind, another sitter crouched below.',
  },
  maskHeld: {
    disciplines: ['Masks'],
    id: 'mask-held',
    title: 'Second Face',
    image: maskHeld,
    tone: 'Colour',
    alt: 'A sitter with pale hair holds a white featureless mask against their face with both hands.',
  },
  maskHands: {
    disciplines: ['Masks'],
    id: 'mask-hands',
    title: 'Unwritten',
    image: maskHands,
    tone: 'Colour',
    alt: 'Close-up of hands gripping a white featureless mask, its eye holes dark.',
  },
  maskStreet: {
    disciplines: ['Masks'],
    id: 'mask-street',
    title: 'Recast',
    image: maskStreet,
    tone: 'Monochrome',
    alt: 'Black-and-white street portrait of a sitter in a white featureless mask beside a partly visible poster.',
  },
  masksDark: {
    disciplines: ['Masks'],
    id: 'masks-dark',
    title: 'Uniform',
    image: masksDark,
    tone: 'Monochrome',
    alt: 'Two figures in white masks emerge from total darkness, side-lit, one above the other.',
  },
  greenF1: {
    disciplines: ['Automotive'],
    id: 'green-f1',
    title: 'Racing Green, Standing Still',
    image: greenF1,
    tone: 'Colour',
    alt: 'Close detail of a Formula 1 car in green Aston Martin livery: the halo, cockpit, nose and a front tyre packed tight in the frame.',
  },
  orangeWheel: {
    disciplines: ['Automotive'],
    id: 'orange-wheel',
    title: 'Chrome Orbit',
    image: orangeWheel,
    tone: 'Colour',
    alt: "Low wide-angle view along the flank of an orange supercar to its polished five-spoke wheel, green trees overhead.",
  },
  redSaleen: {
    disciplines: ['Automotive'],
    id: 'red-saleen',
    title: 'Wings at Rest',
    image: redSaleen,
    tone: 'Colour',
    alt: 'A red Saleen S7 seen from behind with both doors raised, parked on paving stones beneath a brick archway that opens onto trees.',
  },
  red911: {
    disciplines: ['Automotive'],
    id: 'red-911',
    title: 'Garage Hymn',
    image: red911,
    tone: 'Colour',
    alt: 'A red Porsche 911 Turbo nose-on in a dark room, standing on a wooden floor with a wall display behind it.',
  },
  porscheCrest: {
    disciplines: ['Automotive'],
    id: 'porsche-crest',
    title: 'Heraldry',
    image: porscheCrest,
    tone: 'Colour',
    alt: 'Close-up of the Porsche crest set into glossy red paint, the colour deepening to near black at the edges of the frame.',
  },
  blueFerrari: {
    disciplines: ['Automotive'],
    id: 'blue-ferrari',
    title: 'Electric in the Woods',
    image: blueFerrari,
    tone: 'Colour',
    alt: 'A blue Ferrari SF90 on a narrow paved lane through spring woods, seen from slightly above.',
  },
  manhattanBridge: {
    disciplines: ['City'],
    id: 'manhattan-bridge',
    title: 'Iron Lullaby',
    image: manhattanBridge,
    tone: 'Colour',
    alt: 'The Manhattan Bridge from beside its approach: a steel tower, cables and deck against a pale evening sky, the river below.',
  },
  shadowedCorner: {
    disciplines: ['City'],
    id: 'shadowed-corner',
    title: 'Afternoon Lattice',
    image: shadowedCorner,
    tone: 'Colour',
    alt: 'A corner shop raked by low sun, half the facade in hard shadow, a bin and a traffic cone at the kerb and a parked car at the edge.',
  },
  duneHouse: {
    disciplines: ['Coast'],
    id: 'dune-house',
    title: 'Last House on the Dune',
    image: duneHouse,
    tone: 'Colour',
    alt: 'A house silhouetted on top of a dune against a pale evening sky, the sand below in shadow.',
  },
  pastelHorizon: {
    disciplines: ['Coast'],
    id: 'pastel-horizon',
    title: 'Violet Hour',
    image: pastelHorizon,
    tone: 'Colour',
    alt: 'An empty beach at dusk, the sky fading from violet to pink above a grey sea and a line of breaking waves.',
  },
} satisfies Record<string, Plate>;

/**
 * Catalogue order: this order defines plate numbers across the site. Plates
 * are grouped by chapter, in the order of `disciplines`.
 */
export const plateList: Plate[] = [
  // Portraits
  plates.fingersCloseup,
  plates.earringPortrait,
  plates.handsPortrait,
  plates.cupPortrait,
  plates.dropEarringProfile,
  plates.eyesClosed,
  plates.handOverBrow,
  plates.motionProfile,
  plates.furHatCloseup,
  plates.halfShadow,
  plates.lighter,
  plates.yankeesCap,
  plates.framedHands,
  // Editorial
  plates.cathedral,
  plates.recordStore,
  plates.meshPair,
  plates.longCoat,
  plates.studioPair,
  plates.library,
  plates.whiteSkirt,
  plates.parapetSit,
  plates.parapetCrouch,
  plates.grass,
  plates.brickStoop,
  plates.checkedDress,
  plates.hoodedStone,
  plates.barrierPair,
  plates.yellowJacket,
  plates.overShoulder,
  plates.greyWall,
  // Street
  plates.graffitiSteps,
  plates.skateWall,
  plates.chainLink,
  plates.streetLeap,
  // Masks
  plates.cafeBlur,
  plates.maskHeld,
  plates.maskHands,
  plates.maskStreet,
  plates.masksDark,
  // Automotive
  plates.redSaleen,
  plates.red911,
  plates.porscheCrest,
  plates.greenF1,
  plates.orangeWheel,
  plates.blueFerrari,
  // City
  plates.manhattanBridge,
  plates.shadowedCorner,
  // Coast
  plates.duneHouse,
  plates.pastelHorizon,
];

/** The chapters that hold at least one plate, with their plates in order. */
export const chapters = disciplines
  .map((name) => ({ name, slug: name.toLowerCase(), plates: plateList.filter((p) => p.disciplines.includes(name)) }))
  .filter((c) => c.plates.length > 0);

export const plateNumber = (plate: Plate) =>
  String(plateList.findIndex((p) => p.id === plate.id) + 1).padStart(2, '0');

/** Orientation and reduced ratio, read from the file itself. */
export function frameOf(plate: Plate) {
  const { width, height } = plate.image;
  const known: [number, string][] = [
    [2 / 3, '2:3'], [3 / 2, '3:2'], [3 / 4, '3:4'], [4 / 3, '4:3'], [1, '1:1'], [16 / 9, '16:9'], [4 / 5, '4:5'],
  ];
  const r = width / height;
  const match = known.find(([k]) => Math.abs(k - r) < 0.01);
  return {
    orientation: r < 1 ? 'Portrait' : r > 1 ? 'Landscape' : 'Square',
    ratio: match ? match[1] : `${(width / height).toFixed(2)}:1`,
  };
}
