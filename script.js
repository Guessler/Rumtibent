const imageBlock = document.getElementById("imageBlock");

        let imagesFirst = [
            "../src/assets/Rectangle 26.png",
            "../src/assets/Rectangle 21.png",
            "../src/assets/Rectangle 22.png",
        ];
        let imagesSecond = [
            "../src/assets/Rectangle 24.png",
            "../src/assets/Rectangle 23.png",
            "../src/assets/Rectangle 25.png",
        ];
        let largeImagesFirst = [
            "../src/assets/Rectangle 32.png",
            "../src/assets/Rectangle 27.png",
            "../src/assets/Rectangle 28.png",
        ];
        let largeImagesSecond = [
            "../src/assets/Rectangle 29.png",
            "../src/assets/Rectangle 30.png",
            "../src/assets/Rectangle 31.png",
        ];

        let largeImagesFirstSet = new Set();
        let largeImagesSecondSet = new Set();

        function toggleImage(img, index, smallImages, largeImagesArray, largeImagesSet) {
            return () => {
                if (largeImagesSet.has(img)) {
                    return;
                }
                if (largeImagesSet.size >= 1) {
                    let firstImg = largeImagesSet.values().next().value;
                    firstImg.classList.remove('large');
                    let firstImgIndex = Array.from(imageBlock.children).findIndex(button => button.contains(firstImg));
                    if (smallImages === imagesFirst) {
                        firstImg.src = imagesFirst[firstImgIndex];
                    } else {
                        firstImg.src = imagesSecond[firstImgIndex - imagesFirst.length];
                    }
                    largeImagesSet.delete(firstImg);
                }
                largeImagesSet.add(img);
                img.src = largeImagesArray[index];
                img.classList.add('large');
            };
        }
        

        function createImages(smallImages, largeImagesArray, initialLargeIndices, largeImagesSet) {
            smallImages.forEach((src, index) => {
                let img = document.createElement('img');
                if (initialLargeIndices.includes(index)) {
                    img.src = largeImagesArray[index];
                    img.classList.add('large');
                    largeImagesSet.add(img);
                } else {
                    img.src = src;
                }
                img.addEventListener('click', toggleImage(img, index, smallImages, largeImagesArray, largeImagesSet));
                imageBlock.appendChild(img);
            });
        }

        createImages(imagesFirst, largeImagesFirst, [0], largeImagesFirstSet);
        createImages(imagesSecond, largeImagesSecond, [1], largeImagesSecondSet);