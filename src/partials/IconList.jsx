import { Fragment } from 'react';

const IconList = () => {
    const icons = require.context('../images', true);

    const iconList = icons.keys().map((key) => {
        const Icon = icons(key).default;
        const iconName = key.split('./').pop().split('.').shift();

        return (
            <Fragment key={key}>
                <div className="text-center">
                    <Icon className="h-8 w-8 text-gray-500" />
                    <p className="text-sm font-medium mt-2 text-gray-600">{iconName}</p>
                </div>
            </Fragment>
        );
    });

    return (
        <div className="flex overflow-x-auto py-2">
            <div className="grid grid-cols-4 gap-4 mx-auto">
                {iconList}
            </div>
        </div>
    );
};

export default IconList;
