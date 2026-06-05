/**
 * Hàm đồng bộ toàn bộ dữ liệu từ vựng (Cập nhật từ cũ & Thêm từ mới)
 * * @param {Array} localMemory - Danh sách từ hiện có trong bộ nhớ cục bộ
 * @param {Array} syncData - Danh sách từ mới tải về từ server hoặc file đồng bộ
 * @returns {Array} - Danh sách bộ nhớ sau khi đã được đồng bộ đầy đủ
 */
function syncAllWords(localMemory, syncData) {
    // Tạo một bản sao để tránh thay đổi trực tiếp dữ liệu gốc một cách không mong muốn
    const updatedMemory = [...localMemory];

    syncData.forEach(incomingWord => {
        // Tìm kiếm xem từ này đã tồn tại trong bộ nhớ chưa (dựa vào id hoặc thuộc tính định danh)
        const index = updatedMemory.findIndex(item => item.id === incomingWord.id);

        if (index !== -1) {
            // TRƯỜNG HỢP 1: Từ đã tồn tại -> Cập nhật (Ghi đè nội dung mới)
            updatedMemory[index] = {
                ...updatedMemory[index], // Giữ lại các thuộc tính cũ nếu có
                ...incomingWord          // Ghi đè bằng các thuộc tính mới nhất
            };
            console.log(`[Cập nhật] Từ: "${incomingWord.word}" đã được cập nhật thông tin mới.`);
        } else {
            // TRƯỜNG HỢP 2: Từ chưa có -> Thêm mới hoàn toàn
            updatedMemory.push(incomingWord);
            console.log(`[Thêm mới] Từ: "${incomingWord.word}" đã được thêm vào bộ nhớ.`);
        }
    });

    return updatedMemory;
}

// ==========================================
// VÍ DỤ MÔ PHỎNG QUÁ TRÌNH CHẠY THỬ
// ==========================================

// 1. Dữ liệu hiện tại trong thiết bị/bộ nhớ (Local)
let myLocalMemory = [
    { id: 1, word: "Hello", meaning: "Xin chào", status: "learned" },
    { id: 2, word: "Goodbye", meaning: "Tạm biệt", status: "new" }
];

// 2. Dữ liệu mới nhận được từ file sync hoặc server (Có cả từ cũ được sửa và từ mới)
const serverSyncData = [
    // Từ ID 1 thay đổi nghĩa từ "Xin chào" thành "Xin chào / Chào bạn"
    { id: 1, word: "Hello", meaning: "Xin chào / Chào bạn", status: "learned" }, 
    // Từ ID 3 là từ mới hoàn toàn
    { id: 3, word: "Thank you", meaning: "Cảm ơn", status: "new" }
];

console.log("=== TRƯỚC KHI SYNC ===");
console.log(myLocalMemory);

// Chạy hàm đồng bộ toàn bộ
myLocalMemory = syncAllWords(myLocalMemory, serverSyncData);

console.log("\n=== SAU KHI SYNC (ĐÃ FIX CHỈ LẤY TỪ MỚI) ===");
console.log(myLocalMemory);
