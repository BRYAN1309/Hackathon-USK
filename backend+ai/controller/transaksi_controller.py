from model.transaksi_model import TransaksiModel

class TransaksiController:
    @staticmethod
    def get_transaksi_by_user_id(user_id: int):
        """
        Mengelola logika bisnis untuk mengambil data transaksi berdasarkan user_id
        """
        transaksi = TransaksiModel.get_by_user_id(user_id)
        if transaksi is None:
            return None, "Terjadi kesalahan saat mengambil data dari database."
        if len(transaksi) == 0:
            return [], f"Tidak ada transaksi untuk user_id {user_id}."
        return transaksi, "Data transaksi berhasil diambil."
