import client from "./client";

const endpoint = "/listings";

const getListings = () => client.get(endpoint);

const deleteListing = (id) => client.delete(`${endpoint}/${id}`);

const getListing = (id) => client.get(`${endpoint}/${id}`);

const updateListingPrice = (listingId, userId, bid) =>
  client.post(`${endpoint}/updatePrice`, { listingId, userId, bid });

const addListing = (listing, onUploadProgress) => {
  const data = new FormData();

  console.log("what we hav ensend to the addlistning:",listing.images);

  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", listing.category._id);
  data.append("description", listing.description);
  data.append("userId", listing.userId);
  data.append("bidding", listing.bidding.label);

  if (listing.days) data.append("days", listing.days);
  if (listing.bidder) data.append("bidder", listing.bidder);

  listing.images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  if (listing.location)
    data.append("location", JSON.stringify(listing.location));

  if (listing.oldImages && listing.oldImages.length > 0)
    data.append("oldImages", JSON.stringify(listing.oldImages));

  console.log("inbefore api call:" , data);

  if (listing._id)
    return client.put(`${endpoint}/${listing._id}`, data, {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    });

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addListing,
  getListings,
  deleteListing,
  getListing,
  updateListingPrice
};
