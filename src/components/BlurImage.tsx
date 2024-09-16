// image-extended.tsx

import { FC } from "react";
import Image from "next/image";

import { blurHashToDataURL} from "~/utils/imgToBase64";

import { IImageExtended } from "~/utils/types";

 const BlurImage: FC<IImageExtended> = ({
                                                      src,
                                                      blurDataURL,
                                                      ...props
                                                  }) => {

    let newBlurUrl = null;

    if (blurDataURL) {
        newBlurUrl = blurHashToDataURL(blurDataURL) || null;
    }

    return (
        <Image
            src={src}
            blurDataURL={newBlurUrl ? newBlurUrl! : ""}
            placeholder={newBlurUrl ? "blur" : "empty"}
            {...props}
        />
    );
};
export default BlurImage;
