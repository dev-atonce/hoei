import fs from "fs";
import path from "path";
import Image from "next/image";

const ImageComponent = ({ imageName, alt, width, height }: any) => {
  //   let startTime = performance.now();
  const imagePath = path.join(process.cwd(), imageName);

  try {
    const ext = path.extname(imagePath).slice(1);
    // console.log(ext);
    const image = fs.readFileSync(imagePath, "base64");
    const imageUrl = `data:image/${ext};base64,${image}`;
    // let endTime = performance.now();

    // return <Image src={imageUrl} alt={alt} width={width} height={height} />;
    return (
      <>
        <img src={"/img/about_1.png"} alt={alt} width={width} height={height} />
        {/* <img src={imageUrl} alt={alt} width={width} height={height} />; */}
      </>
    );
  } catch (error) {
    console.error("Error reading image file:", error);
    return null;
  }
};

export default ImageComponent;
