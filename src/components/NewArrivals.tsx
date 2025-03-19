
import CommonProductSlider from './common/CommonSlider';
import { ARRIVAL_DATA } from '@/utils/helper';

const Page = () => (
    <>
        <CommonProductSlider title="New Arrivals" data={ARRIVAL_DATA} />
    </>
);

export default Page;

