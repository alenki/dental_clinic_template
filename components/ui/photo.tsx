import Image from "next/image";
import { cn } from "@/lib/cn";
import { images, unsplashUrl, type ImageKey } from "@/lib/images";

/**
 * All photography goes through here. The wrapper carries a warm placeholder
 * tone so a slow or failed remote image degrades to a considered block of
 * colour rather than to white.
 */
export function Photo({
  name,
  className,
  sizes = "100vw",
  priority = false,
  width = 1600,
  overlay = false,
}: {
  name: ImageKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
  overlay?: boolean;
}) {
  const asset = images[name];

  return (
    <div className={cn("relative overflow-hidden bg-dentin/30", className)}>
      <Image
        src={unsplashUrl(asset.id, width) + (asset.params ?? "")}
        alt={asset.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", asset.tone === "portrait" && "u-portrait-tone")}
        style={{ objectPosition: asset.focus ?? "center" }}
      />
      {overlay ? (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent"
        />
      ) : null}
    </div>
  );
}

/** Small caption set beneath a photograph. */
export function Caption({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("mt-4 u-label text-ink-mute", className)}>{children}</p>;
}
