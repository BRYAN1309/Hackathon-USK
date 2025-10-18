from model.transaksi_model import TransaksiModel

class TransaksiController:
    @staticmethod
    def get_transaksi_by_nomor_rekening(nomor_rekening: int):
        """
        Mengelola logika bisnis untuk mengambil data transaksi berdasarkan nomor_rekening
        """
        transaksi = TransaksiModel.get_by_nomor_rekening(nomor_rekening)
        if transaksi is None:
            return None, "Terjadi kesalahan saat mengambil data dari database."
        if len(transaksi) == 0:
            return [], f"Tidak ada transaksi untuk nomor rekening {nomor_rekening}."
        return transaksi, "Data transaksi berhasil diambil."
