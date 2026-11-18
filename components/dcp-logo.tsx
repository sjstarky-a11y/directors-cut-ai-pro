/** "DCP" app icon (the same one registered in the Pi Developer Portal). */
export function DcpLogo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/dcp-logo.png"
      alt=""
      width={44}
      height={44}
      className="h-11 w-11 shrink-0 rounded-xl"
    />
  );
}
