// Import game bundle json file here 
import rational from './GameBundles/rational.json';
import evolution2 from './GameBundles/evolution2.json';
import chromosomes from './GameBundles/chromosomes.json';
import cell1 from './GameBundles/cell1.json';
import circles from './GameBundles/circles.json';
import negative from './GameBundles/negative.json';
import algebra from './GameBundles/algebra.json';
import voltage from './GameBundles/voltage.json';

const BundleRegistry = {
  'rational': rational, 
  'evolution2': evolution2,
  'chromosomes': chromosomes,
  'cell1': cell1,
  'circles': circles,
  'negative': negative,
  'algebra': algebra,
  'voltage': voltage
};

export default BundleRegistry;