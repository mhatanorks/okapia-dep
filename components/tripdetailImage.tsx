import Image from "next/legacy/image";
import styles from "../styles/tripdetail.module.css";
import { Tour } from "../types/types";

type Props = {
  tour: Tour;
};

export function TripdetailImage({ tour }: Props) {
  return (
    <div className={styles.tour_detail_images}>
      <div className={styles.tour_detail_images_top}>
        <Image src={tour.img1} alt={tour.tourName} layout="fill" />
      </div>

      <div className={styles.tour_detail_image}>
        <div className={styles.tour_detail_images_sub}>
          <Image src={tour.img2} alt={tour.tourName} layout="fill" />
        </div>
        <div className={styles.tour_detail_images_sub}>
          <Image src={tour.img3} alt={tour.tourName} layout="fill" />
        </div>
      </div>
    </div>
  );
}
