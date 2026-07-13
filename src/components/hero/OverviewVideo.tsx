import styles from "./Hero.module.css";

export function OverviewVideo() {
  return (
    <div className={styles.videoCard} aria-label="Giddens Organization company overview video">
      <iframe className={styles.videoEmbed} src="https://player.vimeo.com/video/1209388540" title="Giddens Organization Company Overview" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen loading="lazy" />
    </div>
  );
}
