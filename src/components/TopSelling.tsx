
import CommonProductSlider from './common/CommonSlider';
import { SELLING_DATA } from '@/utils/helper';

const Page = () => (
    < div id='sale'>
        <CommonProductSlider title="Best Sellers" data={SELLING_DATA} />
    </div>
);

export default Page;

