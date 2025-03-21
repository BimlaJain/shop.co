
import CommonProductSlider from './common/CommonSlider';
import { ARRIVAL_DATA } from '@/utils/helper';

const Page = () => (
    <div id='arrivals'>
        <CommonProductSlider title="New Arrivals" data={ARRIVAL_DATA} />
    </div>
);

export default Page;

