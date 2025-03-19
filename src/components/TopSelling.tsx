

import CommonProductSlider from './common/CommonSlider';
import { SELLING_DATA } from '@/utils/helper';

const Page = () => (
    <>
        <CommonProductSlider title="Best Sellers" data={SELLING_DATA} />
    </>
);

export default Page;

