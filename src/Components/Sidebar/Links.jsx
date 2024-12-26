// import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import BusinessIcon from '@mui/icons-material/Business';
import AddIcon from '@mui/icons-material/Add';
import MapIcon from '@mui/icons-material/Map';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PeopleIcon from '@mui/icons-material/People';
// import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HomeIcon from '@mui/icons-material/Home';
import FactoryIcon from '@mui/icons-material/Factory';
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import PaymentIcon from '@mui/icons-material/Payment';
// import PlaceIcon from '@mui/icons-material/Place';

export const Links = [
    {
        label: 'الرئيسية',
        icon: <HomeIcon className="icon-edit" />,
        path: '/home',
    },
    {
        label: 'اضافة مستخدم',
        icon: <PersonAddIcon className="icon-edit" />,
        path: '/add-user',
    },
    {
        label: 'المرشحين',
        icon: <PeopleIcon className="icon-edit" />,
        path: '/all-candidates',
    },
    {
        label: 'المحافظات',
        icon: <MapIcon className="icon-edit" />,
        path: '/governorates',
    },
    {
        label: 'الدوائر الانتخابية',
        icon: <CorporateFareIcon className="icon-edit" />,
        path: '/electoral-districts',
    },
    {
        label: 'الاقسام',
        icon: <ApartmentIcon className="icon-edit" />,
        path: '/sections',
    },
    {
        label: 'القري',
        icon: <FactoryIcon className="icon-edit" />,
        path: '/village',
    },
    {
        label: 'المقر الانتخابي',
        icon: <BusinessIcon className="icon-edit" />,
        path: '/electoral-center',
    },
    {
        label: 'اللجان',
        icon: <LocationCityIcon className="icon-edit" />,
        path: '/committee',
    },
    // {
    //     label: 'المجالس',
    //     icon: <AutoAwesomeMosaicIcon className="icon-edit" />,
    //     path: '/councils',
    // },
    {
        label: 'اضافة ناخب',
        icon: <AddIcon className="icon-edit" />,
        path: '/add-voter',
    },
    {
        label: 'اضافة قسم الي دائرة',
        icon: <AddIcon className="icon-edit" />,
        path: '/add-section',
    },
    {
        label: 'اضافة مقر انتخابي',
        icon: <AddIcon className="icon-edit" />,
        path: '/add-electoral-headquarters',
    },
    {
        label: 'اضافة مقر الي دائرة',
        icon: <AddIcon className="icon-edit" />,
        path: '/add-headquarters',
    },

    // {
    //     label: 'التقارير',
    //     icon: <AssessmentIcon className="icon-edit" />,
    //     subLinks: [
    //         { label: 'تقرير يومي تفصيلي', path: '/detailed-daily-report' },
    //         { label: 'تقرير يومي اجمالي', path: '/total-daily-report' },
    //     ],
    // },
    // {
    //     label: 'الحجوزات والتذاكر',
    //     icon: <AddIcon className="icon-edit" />,
    //     path: '/reservation',
    // },
    // { label: 'المارينا', icon: <PlaceIcon className="icon-edit" />, path: '/harboures' },
    // { label: 'قطع تذكرة', icon: <PaymentIcon className="icon-edit" />, path: '/PayingOff' },
];
